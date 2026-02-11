import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';
import { createMockRedis } from '../../mocks/redis.js';
import { signRefreshToken } from '../../helpers/jwt.js';

const mockPrisma = createMockPrisma();
const mockRedis = createMockRedis();

vi.mock('../../../server/configs/db.js', () => ({ prisma: mockPrisma }));
vi.mock('../../../server/index.js', () => ({ redis: mockRedis }));
vi.mock('../../../server/middleware/rateLimiter.js', () => {
  const passthrough = (_req, _res, next) => next();
  return { authLimiter: passthrough, refreshLimiter: passthrough };
});
vi.mock('@simplewebauthn/server', () => ({
  generateRegistrationOptions: vi.fn(),
  verifyRegistrationResponse: vi.fn(),
  generateAuthenticationOptions: vi.fn().mockResolvedValue({ challenge: 'test-challenge' }),
  verifyAuthenticationResponse: vi.fn(),
}));

const supertest = (await import('supertest')).default;
const { expressApp } = await import('../../../server/express.js');

describe('Auth Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('POST /api/auth/self-sign-in', () => {
    it('returns 400 when missing email or password', async () => {
      const res = await supertest(expressApp)
        .post('/api/auth/self-sign-in')
        .send({});

      expect(res.status).toBe(400);
    });

    it('returns 409 when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const res = await supertest(expressApp)
        .post('/api/auth/self-sign-in')
        .send({ email: 'test@test.com', password: 'pass' });

      expect(res.status).toBe(409);
    });
  });

  describe('POST /api/auth/get-auth-options', () => {
    it('returns options for email and stores challenge in Redis', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
        federated_idps: ['google'],
      });
      mockPrisma.passkey.findMany.mockResolvedValue([]);
      mockRedis.set.mockResolvedValue('OK');

      const res = await supertest(expressApp)
        .post('/api/auth/get-auth-options')
        .send({ email: 'test@test.com' });

      expect(res.status).toBe(200);
      expect(mockRedis.set).toHaveBeenCalledWith(
        'passkey_auth:u1',
        expect.any(String),
        'EX',
        120,
      );
    });

    it('returns empty options for unknown email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const res = await supertest(expressApp)
        .post('/api/auth/get-auth-options')
        .send({ email: 'unknown@test.com' });

      expect(res.status).toBe(200);
      expect(res.body.socials).toEqual([]);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('returns 204 when no cookie', async () => {
      const res = await supertest(expressApp).post('/api/auth/logout');
      expect(res.status).toBe(204);
    });

    it('blacklists token and clears cookie', async () => {
      const refreshToken = await signRefreshToken({ id: 'u1' }, '2m');
      mockRedis.set.mockResolvedValue('OK');

      const res = await supertest(expressApp)
        .post('/api/auth/logout')
        .set('Cookie', `jwt_cpic=${refreshToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('cleared cookies');
    });
  });

  describe('POST /api/auth/refresh', () => {
    it('returns 401 when no cookie', async () => {
      const res = await supertest(expressApp).post('/api/auth/refresh');
      expect(res.status).toBe(401);
    });

    it('rotates tokens with valid refresh token', async () => {
      const refreshToken = await signRefreshToken({ id: 'u1' }, '2m');
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.set.mockResolvedValue('OK');

      const res = await supertest(expressApp)
        .post('/api/auth/refresh')
        .set('Cookie', `jwt_cpic=${refreshToken}`)
        .send({ duration: 'SHORT' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
    });
  });

  describe('POST /api/auth/self-sign-in — timing safety', () => {
    it('returns 409 for user without password_hash (timing-safe)', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'google-only@test.com',
        disabled: false,
        password_hash: null,
        userRoles: [{ role: { name: 'CPIC Member' } }],
      });

      const res = await supertest(expressApp)
        .post('/api/auth/self-sign-in')
        .send({ email: 'google-only@test.com', password: 'anypassword' });

      expect(res.status).toBe(409);
    });
  });

  describe('POST /api/auth/logout — Redis resilience', () => {
    it('clears cookie even when Redis is unavailable', async () => {
      const refreshToken = await signRefreshToken({ id: 'u1' }, '2m');
      mockRedis.set.mockRejectedValue(new Error('Redis connection refused'));

      const res = await supertest(expressApp)
        .post('/api/auth/logout')
        .set('Cookie', `jwt_cpic=${refreshToken}`);

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('cleared cookies');
    });
  });

  describe('POST /api/auth/refresh — blacklist ordering', () => {
    it('blacklists old token during rotation', async () => {
      const refreshToken = await signRefreshToken({ id: 'u1' }, '2m');
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.set.mockResolvedValue('OK');

      const res = await supertest(expressApp)
        .post('/api/auth/refresh')
        .set('Cookie', `jwt_cpic=${refreshToken}`)
        .send({ duration: 'SHORT' });

      expect(res.status).toBe(200);
      expect(mockRedis.set).toHaveBeenCalledWith(
        expect.stringContaining('token_bl_'),
        refreshToken,
        'PX',
        expect.any(Number),
      );
    });

    it('returns 503 when Redis is unavailable during refresh', async () => {
      const refreshToken = await signRefreshToken({ id: 'u1' }, '2m');
      mockRedis.set.mockRejectedValue(new Error('Redis connection refused'));

      const res = await supertest(expressApp)
        .post('/api/auth/refresh')
        .set('Cookie', `jwt_cpic=${refreshToken}`)
        .send({ duration: 'SHORT' });

      expect(res.status).toBe(503);
    });
  });

  describe('GET /api/auth/google-callback/ — state validation', () => {
    it('redirects to login on invalid state parameter', async () => {
      const res = await supertest(expressApp)
        .get('/api/auth/google-callback/?state={invalid&code=test-code');

      expect(res.status).toBe(303);
      expect(res.headers.location).toMatch(/\/login/);
    });
  });

  describe('Passkey challenge Redis storage', () => {
    it('returns 400 when auth challenge is expired/missing', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.get.mockResolvedValue(null);

      const res = await supertest(expressApp)
        .post('/api/auth/passkey-auth-verify')
        .send({ email: 'test@test.com', duration: 'SHORT', webAuth: { id: 'cred-1' } });

      expect(res.status).toBe(400);
    });

    it('returns 400 when registration challenge is expired/missing', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.get.mockResolvedValue(null);

      const res = await supertest(expressApp)
        .post('/api/auth/passkey-reg-verification')
        .send({ email: 'test@test.com', duration: 'SHORT', webAuth: {} });

      expect(res.status).toBe(400);
    });

    it('consumes challenge from Redis (get then del) during auth verification', async () => {
      const challengeData = JSON.stringify({ challenge: 'test-challenge' });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.get.mockResolvedValue(challengeData);
      mockRedis.del.mockResolvedValue(1);
      const webauthn = await import('@simplewebauthn/server');
      webauthn.verifyAuthenticationResponse.mockRejectedValue(new Error('test abort'));
      mockPrisma.passkey.findFirst.mockResolvedValue({
        id: 'cred-1',
        publicKey: Buffer.from('test'),
        counter: 0,
        transports: [],
      });

      await supertest(expressApp)
        .post('/api/auth/passkey-auth-verify')
        .send({ email: 'test@test.com', duration: 'SHORT', webAuth: { id: 'cred-1' } });

      expect(mockRedis.get).toHaveBeenCalledWith('passkey_auth:u1');
      expect(mockRedis.del).toHaveBeenCalledWith('passkey_auth:u1');
    });

    it('returns 503 when Redis is unavailable during auth verification', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.get.mockRejectedValue(new Error('Redis connection refused'));

      const res = await supertest(expressApp)
        .post('/api/auth/passkey-auth-verify')
        .send({ email: 'test@test.com', duration: 'SHORT', webAuth: { id: 'cred-1' } });

      expect(res.status).toBe(503);
    });

    it('returns 503 when Redis is unavailable during registration verification', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.get.mockRejectedValue(new Error('Redis connection refused'));

      const res = await supertest(expressApp)
        .post('/api/auth/passkey-reg-verification')
        .send({ email: 'test@test.com', duration: 'SHORT', webAuth: {} });

      expect(res.status).toBe(503);
    });
  });

  describe('POST /api/auth/generate-passkey-reg-options', () => {
    it('returns 400 when email is missing', async () => {
      const res = await supertest(expressApp)
        .post('/api/auth/generate-passkey-reg-options')
        .send({});

      expect(res.status).toBe(400);
    });

    it('returns 404 when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const res = await supertest(expressApp)
        .post('/api/auth/generate-passkey-reg-options')
        .send({ email: 'unknown@test.com' });

      expect(res.status).toBe(404);
    });

    it('returns registration options and stores challenge in Redis', async () => {
      const webauthn = await import('@simplewebauthn/server');
      const mockRegOptions = { challenge: 'reg-challenge', user: { id: 'webauthn-uid' } };
      webauthn.generateRegistrationOptions.mockResolvedValue(mockRegOptions);
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockPrisma.passkey.findMany.mockResolvedValue([]);
      mockRedis.set.mockResolvedValue('OK');

      const res = await supertest(expressApp)
        .post('/api/auth/generate-passkey-reg-options')
        .send({ email: 'test@test.com' });

      expect(res.status).toBe(200);
      expect(res.body.challenge).toBe('reg-challenge');
      expect(mockRedis.set).toHaveBeenCalledWith(
        'passkey_reg:u1',
        expect.any(String),
        'EX',
        120,
      );
    });

    it('returns 503 when Redis is unavailable', async () => {
      const webauthn = await import('@simplewebauthn/server');
      webauthn.generateRegistrationOptions.mockResolvedValue({ challenge: 'c' });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockPrisma.passkey.findMany.mockResolvedValue([]);
      mockRedis.set.mockRejectedValue(new Error('Redis connection refused'));

      const res = await supertest(expressApp)
        .post('/api/auth/generate-passkey-reg-options')
        .send({ email: 'test@test.com' });

      expect(res.status).toBe(503);
    });
  });

  describe('Passkey registration verification — happy path', () => {
    it('returns verified with passkey added message when no duration', async () => {
      const webauthn = await import('@simplewebauthn/server');
      const challengeData = JSON.stringify({
        challenge: 'reg-challenge',
        user: { id: 'webauthn-uid' },
      });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.get.mockResolvedValue(challengeData);
      mockRedis.del.mockResolvedValue(1);
      webauthn.verifyRegistrationResponse.mockResolvedValue({
        verified: true,
        registrationInfo: {
          credential: {
            id: 'cred-1',
            publicKey: new Uint8Array([1, 2, 3]),
            counter: 0,
            transports: ['internal'],
          },
          credentialDeviceType: 'singleDevice',
          credentialBackedUp: false,
        },
      });
      mockPrisma.passkey.create.mockResolvedValue({});

      const res = await supertest(expressApp)
        .post('/api/auth/passkey-reg-verification')
        .send({ email: 'test@test.com', webAuth: {} });

      expect(res.status).toBe(200);
      expect(res.body.verified).toBe(true);
      expect(res.body.message).toBe('passkey added');
    });

    it('consumes challenge from Redis (get then del) during registration', async () => {
      const challengeData = JSON.stringify({ challenge: 'reg-challenge', user: { id: 'wuid' } });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.get.mockResolvedValue(challengeData);
      mockRedis.del.mockResolvedValue(1);
      const webauthn = await import('@simplewebauthn/server');
      webauthn.verifyRegistrationResponse.mockRejectedValue(new Error('test abort'));

      await supertest(expressApp)
        .post('/api/auth/passkey-reg-verification')
        .send({ email: 'test@test.com', webAuth: {} });

      expect(mockRedis.get).toHaveBeenCalledWith('passkey_reg:u1');
      expect(mockRedis.del).toHaveBeenCalledWith('passkey_reg:u1');
    });
  });

  describe('Passkey auth verification — happy path', () => {
    it('returns verified status with accessToken on successful auth', async () => {
      const challengeData = JSON.stringify({ challenge: 'auth-challenge' });
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
      });
      mockRedis.get.mockResolvedValue(challengeData);
      mockRedis.del.mockResolvedValue(1);
      mockPrisma.passkey.findFirst.mockResolvedValue({
        id: 'cred-1',
        publicKey: Buffer.from('test'),
        counter: 0,
        transports: [],
      });
      const webauthn = await import('@simplewebauthn/server');
      webauthn.verifyAuthenticationResponse.mockResolvedValue({
        verified: true,
        authenticationInfo: { newCounter: 1 },
      });
      mockPrisma.passkey.update.mockResolvedValue({});

      const res = await supertest(expressApp)
        .post('/api/auth/passkey-auth-verify')
        .send({ email: 'test@test.com', duration: 'SHORT', webAuth: { id: 'cred-1' } });

      expect(res.status).toBe(200);
      expect(res.body.verified).toBe(true);
      expect(res.body).toHaveProperty('accessToken');
    });
  });

  describe('POST /api/auth/register', () => {
    it('rejects request without invite code', async () => {
      const res = await supertest(expressApp)
        .post('/api/auth/register')
        .send({ user: { email: 'new@test.com' } });

      // requireInviteCode middleware throws AppError which is caught by error handler
      expect(res.status).toBe(400);
    });

    it('returns 400 when user email is missing', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue({
        id: 1,
        code: 'VALID-CODE',
        roleId: 3,
        useCount: 0,
        maxUses: 5,
        expiresAt: new Date(Date.now() + 86400000),
        role: { name: 'CPIC Member' },
        createdBy: { id: 'admin-1', email: 'admin@test.com' },
      });

      const res = await supertest(expressApp)
        .post('/api/auth/register')
        .send({ inviteCode: 'VALID-CODE', user: {} });

      expect(res.status).toBe(400);
    });

    it('registers a new user successfully', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue({
        id: 1,
        code: 'VALID-CODE',
        roleId: 3,
        useCount: 0,
        maxUses: 5,
        expiresAt: new Date(Date.now() + 86400000),
        role: { name: 'CPIC Member' },
        createdBy: { id: 'admin-1', email: 'admin@test.com' },
      });
      mockPrisma.$transaction.mockResolvedValue({
        id: 'new-user-1',
        email: 'new@test.com',
        display_name: 'New User',
      });
      // register() calls findUserForSignIn(newUser.id) after $transaction
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'new-user-1',
        email: 'new@test.com',
        display_name: 'New User',
        disabled: false,
        userRoles: [{ role: { name: 'CPIC Member' } }],
      });

      const res = await supertest(expressApp)
        .post('/api/auth/register')
        .send({
          inviteCode: 'VALID-CODE',
          user: {
            email: 'new@test.com',
            given_name: 'New',
            family_name: 'User',
            assigned_implementers: [],
          },
        });

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('new@test.com');
    });
  });
});

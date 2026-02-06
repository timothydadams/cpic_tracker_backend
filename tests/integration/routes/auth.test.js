import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';
import { createMockRedis } from '../../mocks/redis.js';
import jwt from 'jsonwebtoken';

const mockPrisma = createMockPrisma();
const mockRedis = createMockRedis();

vi.mock('../../../server/configs/db.js', () => ({ prisma: mockPrisma }));
vi.mock('../../../server/index.js', () => ({ redis: mockRedis }));
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
    it('returns options for email', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        disabled: false,
        userRoles: [{ role: { name: 'Admin' } }],
        federated_idps: ['google'],
        passkey_auth_options: null,
      });
      mockPrisma.passkey.findMany.mockResolvedValue([]);
      mockPrisma.user.update.mockResolvedValue({});

      const res = await supertest(expressApp)
        .post('/api/auth/get-auth-options')
        .send({ email: 'test@test.com' });

      expect(res.status).toBe(200);
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
      const refreshToken = jwt.sign({ id: 'u1' }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2m' });
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
      const refreshToken = jwt.sign({ id: 'u1' }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2m' });
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

  describe('POST /api/auth/register', () => {
    it('rejects request without invite code', async () => {
      const res = await supertest(expressApp)
        .post('/api/auth/register')
        .send({ user: { email: 'new@test.com' } });

      // requireInviteCode middleware throws AppError which is caught by error handler
      expect(res.status).toBe(400);
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signAccessToken, signRefreshToken } from '../../helpers/jwt.js';
import { createMockReq, createMockRes, createMockNext } from '../../mocks/express.js';
import { createMockRedis } from '../../mocks/redis.js';

// Mock ALS context store
const mockRun = vi.fn((context, callback) => callback());
vi.mock('../../../server/configs/context.js', () => ({
  als: { run: mockRun },
}));

// Mock redis
const mockRedis = createMockRedis();
vi.mock('../../../server/index.js', () => ({
  redis: mockRedis,
}));

const { userContextMiddleware } = await import('../../../server/middleware/prisma-als-middleware.js');

describe('userContextMiddleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('access token (Authorization header)', () => {
    it('sets isAuthenticated: true when valid access token in header', async () => {
      const token = await signAccessToken({ id: 'user-123', roles: ['Admin'] }, '15m');
      const req = createMockReq({ headers: { authorization: `Bearer ${token}` } });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      expect(mockRun).toHaveBeenCalled();
      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(true);
      expect(context.user).toBe('user-123');
    });

    it('sets isAuthenticated: false when access token is blacklisted', async () => {
      mockRedis.exists.mockResolvedValue(1);
      const token = await signAccessToken({ id: 'user-123', roles: ['Admin'] }, '15m');
      const req = createMockReq({ headers: { authorization: `Bearer ${token}` }, cookies: {} });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(false);
      expect(context.user).toBeNull();
    });

    it('falls back to cookie when access token is blacklisted but cookie is valid', async () => {
      mockRedis.exists.mockResolvedValue(1);
      const accessToken = await signAccessToken({ id: 'user-123', roles: ['Admin'] }, '15m');
      const refreshToken = await signRefreshToken({ id: 'user-123' }, '2m');
      const req = createMockReq({
        headers: { authorization: `Bearer ${accessToken}` },
        cookies: { jwt_cpic: refreshToken },
      });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(true);
      expect(context.user).toBe('user-123');
    });

    it('sets isAuthenticated: false for invalid access token with no cookie', async () => {
      const req = createMockReq({ headers: { authorization: 'Bearer invalid.token' }, cookies: {} });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(false);
      expect(context.user).toBeNull();
    });
  });

  describe('refresh token cookie (fallback)', () => {
    it('sets isAuthenticated: true when valid jwt_cpic cookie exists', async () => {
      const token = await signRefreshToken({ id: 'user-123' }, '2m');
      const req = createMockReq({ cookies: { jwt_cpic: token } });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      expect(mockRun).toHaveBeenCalled();
      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(true);
      expect(context.user).toBe('user-123');
    });

    it('sets isAuthenticated: false when no cookie', async () => {
      const req = createMockReq({ cookies: {} });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(false);
      expect(context.user).toBeNull();
    });

    it('sets isAuthenticated: false for invalid cookie token', async () => {
      const req = createMockReq({ cookies: { jwt_cpic: 'invalid-token' } });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(false);
      expect(context.user).toBeNull();
    });
  });

  describe('priority and fallback behavior', () => {
    it('prefers access token over cookie when both are valid', async () => {
      const accessToken = await signAccessToken({ id: 'access-user' }, '15m');
      const refreshToken = await signRefreshToken({ id: 'cookie-user' }, '2m');
      const req = createMockReq({
        headers: { authorization: `Bearer ${accessToken}` },
        cookies: { jwt_cpic: refreshToken },
      });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(true);
      expect(context.user).toBe('access-user');
    });

    it('falls back to cookie when access token is expired', async () => {
      const expiredToken = await signAccessToken({ id: 'expired-user' }, '0s');
      const refreshToken = await signRefreshToken({ id: 'cookie-user' }, '2m');

      // Wait for the access token to expire
      await new Promise(resolve => setTimeout(resolve, 1100));

      const req = createMockReq({
        headers: { authorization: `Bearer ${expiredToken}` },
        cookies: { jwt_cpic: refreshToken },
      });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(true);
      expect(context.user).toBe('cookie-user');
    });
  });

  describe('Redis resilience', () => {
    it('still authenticates via access token when Redis is unavailable', async () => {
      mockRedis.exists.mockRejectedValue(new Error('Redis connection refused'));
      const token = await signAccessToken({ id: 'user-123' }, '15m');
      const req = createMockReq({ headers: { authorization: `Bearer ${token}` } });
      const res = createMockRes();
      const next = createMockNext();

      await userContextMiddleware(req, res, next);

      const context = mockRun.mock.calls[0][0];
      expect(context.isAuthenticated).toBe(true);
      expect(context.user).toBe('user-123');
    });
  });

  it('always calls next() regardless of auth outcome', async () => {
    const req = createMockReq({ cookies: { jwt_cpic: 'bad-token' } });
    const res = createMockRes();
    const next = createMockNext();

    await userContextMiddleware(req, res, next);

    expect(mockRun).toHaveBeenCalled();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { createMockReq, createMockRes, createMockNext } from '../../mocks/express.js';
import { createMockRedis } from '../../mocks/redis.js';

// Mock redis from server/index.js to prevent server startup
const mockRedis = createMockRedis();
vi.mock('../../../server/index.js', () => ({
  redis: mockRedis,
}));

// Mock ALS context store
const mockStore = { isAuthenticated: false, user: null };
vi.mock('../../../server/configs/context.js', () => ({
  als: { getStore: vi.fn(() => mockStore) },
}));

const { verifyToken, requireGlobalAdmin } = await import('../../../server/middleware/requireAuth.js');

describe('verifyToken', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.isAuthenticated = false;
    mockStore.user = null;
  });

  it('returns 401 when no Authorization header', async () => {
    const req = createMockReq({ headers: {} });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 when header does not start with "Bearer "', async () => {
    const req = createMockReq({ headers: { authorization: 'Basic abc' } });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it('returns 403 when token is blacklisted', async () => {
    const token = jwt.sign({ id: '123', roles: ['Admin'] }, process.env.JWT_ACCESS_SECRET);
    mockRedis.exists.mockResolvedValue(1);

    const req = createMockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 for invalid/expired token', async () => {
    mockRedis.exists.mockResolvedValue(0);
    const req = createMockReq({ headers: { authorization: 'Bearer invalid.token.here' } });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'invalid token' });
  });

  it('sets res.locals.user and role flags for valid token', async () => {
    mockRedis.exists.mockResolvedValue(0);
    const payload = {
      id: 'user-123',
      email: 'test@test.com',
      roles: ['Admin', 'CPIC Member'],
      name: 'Test User',
    };
    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });

    const req = createMockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.locals.user.id).toBe('user-123');
    expect(res.locals.user.isGlobalAdmin).toBe(true);
    expect(res.locals.user.isCPICMember).toBe(true);
    expect(res.locals.user.isCPICAdmin).toBe(false);
    expect(res.locals.user.isImplementer).toBe(false);
  });

  it('sets isCPICAdmin flag for CPIC Admin role', async () => {
    mockRedis.exists.mockResolvedValue(0);
    const token = jwt.sign(
      { id: 'u1', roles: ['CPIC Admin'] },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' },
    );

    const req = createMockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);
    expect(res.locals.user.isCPICAdmin).toBe(true);
  });

  it('sets isImplementer flag for Implementer role', async () => {
    mockRedis.exists.mockResolvedValue(0);
    const token = jwt.sign(
      { id: 'u1', roles: ['Implementer'] },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' },
    );

    const req = createMockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);
    expect(res.locals.user.isImplementer).toBe(true);
  });

  it('updates ALS store on successful auth', async () => {
    mockRedis.exists.mockResolvedValue(0);
    const payload = { id: 'user-456', roles: ['Admin'] };
    const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });

    const req = createMockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);

    expect(mockStore.isAuthenticated).toBe(true);
    expect(mockStore.user).toBe('user-456');
  });

  it('does not update ALS store on failed auth', async () => {
    mockRedis.exists.mockResolvedValue(0);
    const req = createMockReq({ headers: { authorization: 'Bearer invalid.token' } });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);

    expect(mockStore.isAuthenticated).toBe(false);
    expect(mockStore.user).toBeNull();
  });

  it('does not update ALS store when token is blacklisted', async () => {
    const token = jwt.sign({ id: 'user-789', roles: ['Admin'] }, process.env.JWT_ACCESS_SECRET);
    mockRedis.exists.mockResolvedValue(1);

    const req = createMockReq({ headers: { authorization: `Bearer ${token}` } });
    const res = createMockRes();
    const next = createMockNext();

    await verifyToken(req, res, next);

    expect(mockStore.isAuthenticated).toBe(false);
    expect(mockStore.user).toBeNull();
  });
});

describe('requireGlobalAdmin', () => {
  it('returns 403 when user is not admin', async () => {
    const req = createMockReq();
    const res = createMockRes();
    res.locals.user = { id: 'user-1', isGlobalAdmin: false };
    const next = createMockNext();

    await requireGlobalAdmin(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 when user has no id', async () => {
    const req = createMockReq();
    const res = createMockRes();
    res.locals.user = { isGlobalAdmin: true };
    const next = createMockNext();

    await requireGlobalAdmin(req, res, next);
    expect(res.sendStatus).toHaveBeenCalledWith(403);
  });

  it('calls next() for admin user', async () => {
    const req = createMockReq();
    const res = createMockRes();
    res.locals.user = { id: 'admin-1', isGlobalAdmin: true };
    const next = createMockNext();

    await requireGlobalAdmin(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

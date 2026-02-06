import { describe, it, expect, vi, beforeEach } from 'vitest';
import jwt from 'jsonwebtoken';
import { createMockReq, createMockRes, createMockNext } from '../../mocks/express.js';

// We need to mock the als context store
const mockRun = vi.fn((context, callback) => callback());
vi.mock('../../../server/configs/context.js', () => ({
  als: { run: mockRun },
}));

const { userContextMiddleware } = await import('../../../server/middleware/prisma-als-middleware.js');

describe('userContextMiddleware', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('sets isAuthenticated: true when valid jwt_cpic cookie exists', () => {
    const token = jwt.sign({ id: 'user-123' }, process.env.JWT_REFRESH_SECRET, { expiresIn: '2m' });
    const req = createMockReq({ cookies: { jwt_cpic: token } });
    const res = createMockRes();
    const next = createMockNext();

    userContextMiddleware(req, res, next);

    expect(mockRun).toHaveBeenCalled();
    const context = mockRun.mock.calls[0][0];
    expect(context.isAuthenticated).toBe(true);
    expect(context.user).toBe('user-123');
  });

  it('sets isAuthenticated: false when no cookie', () => {
    const req = createMockReq({ cookies: {} });
    const res = createMockRes();
    const next = createMockNext();

    userContextMiddleware(req, res, next);

    const context = mockRun.mock.calls[0][0];
    expect(context.isAuthenticated).toBe(false);
    expect(context.user).toBeNull();
  });

  it('sets isAuthenticated: false for invalid cookie token', () => {
    const req = createMockReq({ cookies: { jwt_cpic: 'invalid-token' } });
    const res = createMockRes();
    const next = createMockNext();

    userContextMiddleware(req, res, next);

    const context = mockRun.mock.calls[0][0];
    expect(context.isAuthenticated).toBe(false);
    expect(context.user).toBeNull();
  });

  it('still calls next() even when token is invalid', () => {
    const req = createMockReq({ cookies: { jwt_cpic: 'bad-token' } });
    const res = createMockRes();
    const next = createMockNext();

    userContextMiddleware(req, res, next);

    // next is called inside als.run's callback
    expect(mockRun).toHaveBeenCalled();
  });
});

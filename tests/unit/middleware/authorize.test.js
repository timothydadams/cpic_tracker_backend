import { describe, it, expect } from 'vitest';
import { authorize } from '../../../server/middleware/authorize.js';
import { createMockReq, createMockRes, createMockNext } from '../../mocks/express.js';

describe('authorize middleware', () => {
  it('calls next() when policy returns true', async () => {
    const policy = () => true;
    const req = createMockReq();
    const res = createMockRes();
    res.locals.user = { id: 'user-1', roles: ['Admin'] };
    const next = createMockNext();

    await authorize(policy, {})(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('throws AppError with 403 when policy returns false', async () => {
    const policy = () => false;
    const req = createMockReq();
    const res = createMockRes();
    res.locals.user = { id: 'user-1', roles: ['Viewer'] };
    const next = createMockNext();

    await expect(authorize(policy, {})(req, res, next)).rejects.toThrow('Access Denied');
  });

  it('passes user and resource to policy function', async () => {
    const policy = (user, resource) => {
      return user.id === 'admin' && resource.id === 42;
    };
    const req = createMockReq();
    const res = createMockRes();
    res.locals.user = { id: 'admin' };
    const next = createMockNext();

    await authorize(policy, { id: 42 })(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

import { describe, it, expect } from 'vitest';
import { authorize } from '../../../server/middleware/authorize.js';
import { createMockReq, createMockRes, createMockNext } from '../../mocks/express.js';

describe('authorize middleware', () => {
  it('calls next() when policy returns true', () => {
    const policy = () => true;
    const req = createMockReq();
    const res = createMockRes();
    res.locals.user = { id: 'user-1', roles: ['Admin'] };
    const next = createMockNext();

    authorize(policy, {})(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('throws AppError with 403 when policy returns false', () => {
    const policy = () => false;
    const req = createMockReq();
    const res = createMockRes();
    res.locals.user = { id: 'user-1', roles: ['Viewer'] };
    const next = createMockNext();

    expect(() => authorize(policy, {})(req, res, next)).toThrow('Access Denied');
  });

  it('passes user and resource to policy function', () => {
    const policy = (user, resource) => {
      return user.id === 'admin' && resource.id === 42;
    };
    const req = createMockReq();
    const res = createMockRes();
    res.locals.user = { id: 'admin' };
    const next = createMockNext();

    authorize(policy, { id: 42 })(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

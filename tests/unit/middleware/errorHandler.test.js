import { describe, it, expect, vi } from 'vitest';
import { createMockReq, createMockRes, createMockNext } from '../../mocks/express.js';
import { AppError } from '../../../server/errors/AppError.js';

// We need to mock the Prisma import to get the error classes
vi.mock('../../../prisma/generated/prisma/index.js', () => {
  class PrismaClientKnownRequestError extends Error {
    constructor(message, { code, meta } = {}) {
      super(message);
      this.name = 'PrismaClientKnownRequestError';
      this.code = code;
      this.meta = meta;
    }
  }
  class PrismaClientValidationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'PrismaClientValidationError';
    }
  }
  return {
    Prisma: {
      PrismaClientKnownRequestError,
      PrismaClientValidationError,
    },
  };
});

const { errorHandler } = await import('../../../server/middleware/handleErrors.js');

describe('errorHandler', () => {
  it('handles AppError with custom status and message', () => {
    const err = new AppError('Not Found', 404);
    const req = createMockReq({ path: '/api/test' });
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      status: 'error',
      message: 'Not Found',
    }));
  });

  it('handles Prisma P2002 unique constraint violation', async () => {
    const { Prisma } = await import('../../../prisma/generated/prisma/index.js');
    const err = new Prisma.PrismaClientKnownRequestError('Unique', {
      code: 'P2002',
      meta: { target: 'email', modelName: 'User' },
    });

    const req = createMockReq({ path: '/api/test' });
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('already exists'),
    }));
  });

  it('handles Prisma P2025 not found', async () => {
    const { Prisma } = await import('../../../prisma/generated/prisma/index.js');
    const err = new Prisma.PrismaClientKnownRequestError('Not found', {
      code: 'P2025',
    });

    const req = createMockReq({ path: '/api/test' });
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Record not found',
    }));
  });

  it('handles Prisma P2003 foreign key constraint', async () => {
    const { Prisma } = await import('../../../prisma/generated/prisma/index.js');
    const err = new Prisma.PrismaClientKnownRequestError('FK', {
      code: 'P2003',
    });

    const req = createMockReq({ path: '/api/test' });
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Invalid reference to related record',
    }));
  });

  it('handles PrismaClientValidationError', async () => {
    const { Prisma } = await import('../../../prisma/generated/prisma/index.js');
    const err = new Prisma.PrismaClientValidationError('Validation failed');

    const req = createMockReq({ path: '/api/test' });
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Invalid data provided',
    }));
  });

  it('handles unknown error with 500', () => {
    const err = new Error('Something broke');

    const req = createMockReq({ path: '/api/test' });
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Internal server error',
    }));
  });

  it('redirects on Google OAuth callback path with inviteCode', () => {
    const err = new AppError('Google error', 400, { inviteCode: 'abc123' });
    const req = createMockReq({ path: '/api/auth/google-callback/' });
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.redirect).toHaveBeenCalled();
    const redirectUrl = res.redirect.mock.calls[0][0];
    expect(redirectUrl).toContain('/register/abc123');
    expect(redirectUrl).toContain('message=Google+error');
  });

  it('redirects to login on Google OAuth callback without inviteCode', () => {
    const err = new AppError('Auth failed', 401);
    const req = createMockReq({ path: '/api/auth/google-callback/' });
    const res = createMockRes();
    const next = createMockNext();

    errorHandler(err, req, res, next);

    expect(res.redirect).toHaveBeenCalled();
    const redirectUrl = res.redirect.mock.calls[0][0];
    expect(redirectUrl).toContain('/login');
  });
});

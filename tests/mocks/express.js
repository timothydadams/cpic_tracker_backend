import { vi } from 'vitest';

export const createMockReq = (overrides = {}) => ({
  params: {},
  query: {},
  body: {},
  headers: {},
  cookies: {},
  path: '/',
  useragent: {},
  ...overrides,
});

export const createMockRes = () => {
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    sendStatus: vi.fn().mockReturnThis(),
    redirect: vi.fn().mockReturnThis(),
    cookie: vi.fn().mockReturnThis(),
    clearCookie: vi.fn().mockReturnThis(),
    locals: { user: {} },
  };
  return res;
};

export const createMockNext = () => vi.fn();

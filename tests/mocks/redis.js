import { vi } from 'vitest';

export const createMockRedis = () => ({
  exists: vi.fn(),
  set: vi.fn(),
  get: vi.fn(),
  del: vi.fn(),
});

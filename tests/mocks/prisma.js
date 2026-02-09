import { vi } from 'vitest';

const createModelMock = () => ({
  findUnique: vi.fn(),
  findFirst: vi.fn(),
  findMany: vi.fn(),
  create: vi.fn(),
  createMany: vi.fn(),
  update: vi.fn(),
  updateMany: vi.fn(),
  updateManyAndReturn: vi.fn(),
  delete: vi.fn(),
  deleteMany: vi.fn(),
  count: vi.fn(),
  groupBy: vi.fn(),
});

export const createMockPrisma = () => ({
  user: createModelMock(),
  role: createModelMock(),
  userRole: createModelMock(),
  strategy: createModelMock(),
  strategyImplementer: createModelMock(),
  passkey: createModelMock(),
  comment: createModelMock(),
  policies: createModelMock(),
  focusArea: createModelMock(),
  implementer: createModelMock(),
  statusOptions: createModelMock(),
  timelineOptions: createModelMock(),
  faq: createModelMock(),
  inviteCode: createModelMock(),
  $transaction: vi.fn(),
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';
import { createMockRedis } from '../../mocks/redis.js';
import jwt from 'jsonwebtoken';

const mockPrisma = createMockPrisma();
const mockRedis = createMockRedis();

vi.mock('../../../server/configs/db.js', () => ({ prisma: mockPrisma }));
vi.mock('../../../server/index.js', () => ({ redis: mockRedis }));
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid-invite'),
}));

const supertest = (await import('supertest')).default;
const { expressApp } = await import('../../../server/express.js');

const adminToken = jwt.sign(
  { id: 'admin-1', email: 'admin@test.com', roles: ['Admin'], name: 'Admin' },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: '15m' },
);

describe('Invite Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('POST /api/invites', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).post('/api/invites').send({});
      expect(res.status).toBe(401);
    });

    it('creates invite code for authenticated user', async () => {
      mockPrisma.inviteCode.create.mockResolvedValue({
        id: 1,
        code: 'mock-uuid-invite',
        createdBy: { id: 'admin-1', email: 'admin@test.com' },
      });

      const res = await supertest(expressApp)
        .post('/api/invites')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ roleId: 'r1', maxUses: 5, expiresInDays: 7 });

      expect(res.status).toBe(201);
      expect(res.body.data.code).toBe('mock-uuid-invite');
    });
  });

  describe('GET /api/invites/my-codes', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/invites/my-codes');
      expect(res.status).toBe(401);
    });

    it('returns codes for authenticated user', async () => {
      mockPrisma.inviteCode.findMany.mockResolvedValue([{ id: 1, code: 'abc' }]);

      const res = await supertest(expressApp)
        .get('/api/invites/my-codes')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe('GET /api/invites/my-invites', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/invites/my-invites');
      expect(res.status).toBe(401);
    });

    it('returns invited users for authenticated user', async () => {
      mockPrisma.user.findMany.mockResolvedValue([]);

      const res = await supertest(expressApp)
        .get('/api/invites/my-invites')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty('count', 0);
    });
  });

  describe('GET /api/invites/:code/validate', () => {
    it('validates a valid code (public)', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue({
        id: 1,
        roleId: 'r1',
        expiresAt: new Date('2099-01-01'),
        useCount: 0,
        maxUses: 5,
        role: { name: 'Viewer' },
        createdBy: { id: 'u1', email: 'admin@test.com' },
      });

      const res = await supertest(expressApp).get('/api/invites/valid-code/validate');

      expect(res.status).toBe(200);
      expect(res.body.data.valid).toBe(true);
      expect(res.body.data.roleName).toBe('Viewer');
    });

    it('returns error for invalid code', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue(null);

      const res = await supertest(expressApp).get('/api/invites/bad-code/validate');

      // AppError is thrown and caught by error handler
      expect(res.status).toBe(404);
    });
  });

  describe('GET /api/invites/:code/stats', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/invites/code/stats');
      expect(res.status).toBe(401);
    });
  });
});

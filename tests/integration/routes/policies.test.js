import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';
import { createMockRedis } from '../../mocks/redis.js';
import { signAccessToken } from '../../helpers/jwt.js';

const mockPrisma = createMockPrisma();
const mockRedis = createMockRedis();

vi.mock('../../../server/configs/db.js', () => ({ prisma: mockPrisma }));
vi.mock('../../../server/index.js', () => ({ redis: mockRedis }));

const supertest = (await import('supertest')).default;
const { expressApp } = await import('../../../server/express.js');

const adminToken = await signAccessToken(
  { id: 'admin-1', email: 'admin@test.com', roles: ['Admin'], name: 'Admin' },
  '15m',
);

const viewerToken = await signAccessToken(
  { id: 'viewer-1', email: 'viewer@test.com', roles: ['Viewer'], name: 'Viewer' },
  '15m',
);

describe('Policy Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('GET /api/policies', () => {
    it('returns policies without auth (public)', async () => {
      mockPrisma.policies.findMany.mockResolvedValue([{ id: 'p1', title: 'Policy 1' }]);

      const res = await supertest(expressApp).get('/api/policies');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe('GET /api/policies/:id', () => {
    it('returns single policy', async () => {
      mockPrisma.policies.findUnique.mockResolvedValue({
        id: 1,
        title: 'Policy 1',
        area: {},
        strategies: [],
      });

      const res = await supertest(expressApp).get('/api/policies/1');
      expect(res.status).toBe(200);
    });

    it('returns 404 when policy not found', async () => {
      mockPrisma.policies.findUnique.mockResolvedValue(null);

      const res = await supertest(expressApp).get('/api/policies/999');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/policies', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).post('/api/policies').send({});
      expect(res.status).toBe(401);
    });

    it('creates policy for admin', async () => {
      mockPrisma.policies.create.mockResolvedValue({ id: 'p2', title: 'New' });

      const res = await supertest(expressApp)
        .post('/api/policies')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'New' });

      expect(res.status).toBe(200);
    });

    it('denies viewer from creating policy', async () => {
      const res = await supertest(expressApp)
        .post('/api/policies')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ title: 'New' });

      expect(res.status).toBe(403);
    });
  });

  describe('PUT /api/policies/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).put('/api/policies/1').send({});
      expect(res.status).toBe(401);
    });

    it('denies viewer from updating policy', async () => {
      mockPrisma.policies.findUnique.mockResolvedValue({ id: 1, area: {}, strategies: [] });

      const res = await supertest(expressApp)
        .put('/api/policies/1')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ title: 'Updated' });

      expect(res.status).toBe(403);
    });
  });

  describe('DELETE /api/policies/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).delete('/api/policies/1');
      expect(res.status).toBe(401);
    });

    it('denies viewer from deleting policy', async () => {
      mockPrisma.policies.findUnique.mockResolvedValue({ id: 1, area: {}, strategies: [] });

      const res = await supertest(expressApp)
        .delete('/api/policies/1')
        .set('Authorization', `Bearer ${viewerToken}`);

      expect(res.status).toBe(403);
    });
  });
});

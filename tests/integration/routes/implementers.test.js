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

describe('Implementer Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('GET /api/implementers', () => {
    it('returns implementers without auth (public)', async () => {
      mockPrisma.implementer.findMany.mockResolvedValue([{ id: 1, name: 'Dept A' }]);

      const res = await supertest(expressApp).get('/api/implementers');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe('GET /api/implementers/:id', () => {
    it('returns single implementer', async () => {
      mockPrisma.implementer.findUnique.mockResolvedValue({ id: 1, name: 'Dept A' });

      const res = await supertest(expressApp).get('/api/implementers/1');
      expect(res.status).toBe(200);
    });

    it('returns 404 when not found', async () => {
      mockPrisma.implementer.findUnique.mockResolvedValue(null);

      const res = await supertest(expressApp).get('/api/implementers/999');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/implementers/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).post('/api/implementers/1').send({});
      expect(res.status).toBe(401);
    });

    it('creates implementer for admin', async () => {
      mockPrisma.implementer.create.mockResolvedValue({ id: 2, name: 'New' });

      const res = await supertest(expressApp)
        .post('/api/implementers/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'New' });

      expect(res.status).toBe(200);
    });

    it('denies viewer', async () => {
      const res = await supertest(expressApp)
        .post('/api/implementers/1')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ name: 'New' });

      expect(res.status).toBe(403);
    });
  });

  describe('PUT /api/implementers/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).put('/api/implementers/1').send({});
      expect(res.status).toBe(401);
    });

    it('updates implementer for admin', async () => {
      mockPrisma.implementer.findUnique.mockResolvedValue({ id: 1, name: 'Old' });
      mockPrisma.implementer.update.mockResolvedValue({ id: 1, name: 'Updated' });

      const res = await supertest(expressApp)
        .put('/api/implementers/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Updated' });

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/implementers/:id', () => {
    it('deletes implementer for admin', async () => {
      mockPrisma.implementer.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.implementer.delete.mockResolvedValue({ id: 1 });

      const res = await supertest(expressApp)
        .delete('/api/implementers/1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('denies viewer from deleting', async () => {
      mockPrisma.implementer.findUnique.mockResolvedValue({ id: 1 });

      const res = await supertest(expressApp)
        .delete('/api/implementers/1')
        .set('Authorization', `Bearer ${viewerToken}`);

      expect(res.status).toBe(403);
    });
  });
});

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

describe('Focus Area Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('GET /api/focusareas', () => {
    it('returns focus areas without auth (public)', async () => {
      mockPrisma.focusArea.findMany.mockResolvedValue([{ id: 1, title: 'Area 1' }]);

      const res = await supertest(expressApp).get('/api/focusareas');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe('GET /api/focusareas/:id', () => {
    it('returns single focus area', async () => {
      mockPrisma.focusArea.findUnique.mockResolvedValue({ id: 1, title: 'Area 1' });

      const res = await supertest(expressApp).get('/api/focusareas/1');
      expect(res.status).toBe(200);
    });

    it('returns 404 when not found', async () => {
      mockPrisma.focusArea.findUnique.mockResolvedValue(null);

      const res = await supertest(expressApp).get('/api/focusareas/999');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/focusareas', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).post('/api/focusareas').send({});
      expect(res.status).toBe(401);
    });

    it('creates focus area for admin', async () => {
      mockPrisma.focusArea.create.mockResolvedValue({ id: 2, title: 'New' });

      const res = await supertest(expressApp)
        .post('/api/focusareas')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'New' });

      expect(res.status).toBe(200);
    });

    it('denies viewer', async () => {
      const res = await supertest(expressApp)
        .post('/api/focusareas')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ title: 'New' });

      expect(res.status).toBe(403);
    });
  });

  describe('PUT /api/focusareas/:id', () => {
    it('updates focus area for admin', async () => {
      mockPrisma.focusArea.findUnique.mockResolvedValue({ id: 1, title: 'Old' });
      mockPrisma.focusArea.update.mockResolvedValue({ id: 1, title: 'Updated' });

      const res = await supertest(expressApp)
        .put('/api/focusareas/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ title: 'Updated' });

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/focusareas/:id', () => {
    it('deletes focus area for admin', async () => {
      mockPrisma.focusArea.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.focusArea.delete.mockResolvedValue({ id: 1 });

      const res = await supertest(expressApp)
        .delete('/api/focusareas/1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('denies viewer from deleting', async () => {
      mockPrisma.focusArea.findUnique.mockResolvedValue({ id: 1 });

      const res = await supertest(expressApp)
        .delete('/api/focusareas/1')
        .set('Authorization', `Bearer ${viewerToken}`);

      expect(res.status).toBe(403);
    });
  });
});

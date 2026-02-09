import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';
import { createMockRedis } from '../../mocks/redis.js';
import jwt from 'jsonwebtoken';

const mockPrisma = createMockPrisma();
const mockRedis = createMockRedis();

vi.mock('../../../server/configs/db.js', () => ({ prisma: mockPrisma }));
vi.mock('../../../server/index.js', () => ({ redis: mockRedis }));

const supertest = (await import('supertest')).default;
const { expressApp } = await import('../../../server/express.js');

const adminToken = jwt.sign(
  { id: 'admin-1', email: 'admin@test.com', roles: ['Admin'], name: 'Admin' },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: '15m' },
);

const viewerToken = jwt.sign(
  { id: 'viewer-1', email: 'viewer@test.com', roles: ['Viewer'], name: 'Viewer' },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: '15m' },
);

describe('Comments Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('GET /api/comments', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/comments');
      expect(res.status).toBe(401);
    });

    it('returns comments for admin', async () => {
      mockPrisma.comment.findMany.mockResolvedValue([{ id: 1, content: 'test' }]);

      const res = await supertest(expressApp)
        .get('/api/comments')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('denies viewer access to all comments', async () => {
      const res = await supertest(expressApp)
        .get('/api/comments')
        .set('Authorization', `Bearer ${viewerToken}`);

      // authorize throws AppError 403
      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/comments/:id', () => {
    it('returns 500 without auth (canRead requires user.roles)', async () => {
      // NOTE: This route has no verifyToken middleware but the controller calls
      // authorize(canRead, comment) which needs res.locals.user.roles.
      // This is a known bug in the source - the route works only when user is set.
      mockPrisma.comment.findUnique.mockResolvedValue({ id: 1, content: 'test' });

      const res = await supertest(expressApp).get('/api/comments/1');
      expect(res.status).toBe(500);
    });

    it('returns 404 when comment not found', async () => {
      mockPrisma.comment.findUnique.mockResolvedValue(null);

      const res = await supertest(expressApp).get('/api/comments/999');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/comments', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).post('/api/comments').send({});
      expect(res.status).toBe(401);
    });

    it('creates a comment for admin', async () => {
      mockPrisma.comment.create.mockResolvedValue({ id: 1, content: 'new comment' });

      const res = await supertest(expressApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ strategy_id: '1', content: 'new comment' });

      expect(res.status).toBe(200);
    });

    it('denies viewer from creating comment', async () => {
      const res = await supertest(expressApp)
        .post('/api/comments')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ strategy_id: '1', content: 'denied' });

      expect(res.status).toBe(403);
    });
  });

  describe('PUT /api/comments/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).put('/api/comments/1').send({});
      expect(res.status).toBe(401);
    });

    it('allows admin to update any comment', async () => {
      mockPrisma.comment.findUnique.mockResolvedValue({ id: 1, user_id: 'someone' });
      mockPrisma.comment.update.mockResolvedValue({ id: 1, content: 'updated' });

      const res = await supertest(expressApp)
        .put('/api/comments/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ content: 'updated' });

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/comments/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).delete('/api/comments/1');
      expect(res.status).toBe(401);
    });

    it('allows admin to delete any comment', async () => {
      mockPrisma.comment.findUnique.mockResolvedValue({ id: 1, user_id: 'someone' });
      mockPrisma.comment.delete.mockResolvedValue({ id: 1 });

      const res = await supertest(expressApp)
        .delete('/api/comments/1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });
  });
});

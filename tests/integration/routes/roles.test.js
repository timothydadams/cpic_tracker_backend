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

describe('Roles Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('GET /api/roles', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/roles');
      expect(res.status).toBe(401);
    });

    it('returns roles for admin', async () => {
      mockPrisma.role.findMany.mockResolvedValue([{ id: 'r1', name: 'Admin' }]);

      const res = await supertest(expressApp)
        .get('/api/roles')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('denies Viewer access to roles', async () => {
      const res = await supertest(expressApp)
        .get('/api/roles')
        .set('Authorization', `Bearer ${viewerToken}`);

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/roles/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/roles/1');
      expect(res.status).toBe(401);
    });

    it('returns role for admin', async () => {
      mockPrisma.role.findUnique.mockResolvedValue({ id: 1, name: 'Admin' });

      const res = await supertest(expressApp)
        .get('/api/roles/1')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });
  });

  describe('POST /api/roles', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).post('/api/roles').send({ name: 'New' });
      expect(res.status).toBe(401);
    });

    it('creates role for admin', async () => {
      mockPrisma.role.create.mockResolvedValue({ id: 'r2', name: 'New' });

      const res = await supertest(expressApp)
        .post('/api/roles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'New' });

      expect(res.status).toBe(200);
    });

    it('denies viewer from creating role', async () => {
      const res = await supertest(expressApp)
        .post('/api/roles')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ name: 'New' });

      expect(res.status).toBe(403);
    });
  });

  describe('PUT /api/roles/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).put('/api/roles/1').send({});
      expect(res.status).toBe(401);
    });

    it('denies viewer from updating role', async () => {
      mockPrisma.role.findUnique.mockResolvedValue({ id: 1, name: 'Old' });

      const res = await supertest(expressApp)
        .put('/api/roles/1')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ name: 'Updated' });

      expect(res.status).toBe(403);
    });
  });

  describe('DELETE /api/roles/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).delete('/api/roles/1');
      expect(res.status).toBe(401);
    });

    it('denies viewer from deleting role', async () => {
      mockPrisma.role.findUnique.mockResolvedValue({ id: 1, name: 'Delete' });

      const res = await supertest(expressApp)
        .delete('/api/roles/1')
        .set('Authorization', `Bearer ${viewerToken}`);

      expect(res.status).toBe(403);
    });
  });
});

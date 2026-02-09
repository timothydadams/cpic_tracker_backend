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

describe('User Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('GET /api/users', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/users');
      expect(res.status).toBe(401);
    });

    it('returns users for admin', async () => {
      mockPrisma.user.findMany.mockResolvedValue([
        { id: 'u1', email: 'a@test.com', userRoles: [{ role: { name: 'Admin' } }] },
      ]);

      const res = await supertest(expressApp)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/users/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/users/u1');
      expect(res.status).toBe(401);
    });

    it('returns user for self', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'viewer-1',
        email: 'viewer@test.com',
      });
      mockPrisma.userRole.findMany.mockResolvedValue([
        { role: { name: 'Viewer', id: 'r1' } },
      ]);

      const res = await supertest(expressApp)
        .get('/api/users/viewer-1')
        .set('Authorization', `Bearer ${viewerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe('viewer-1');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).put('/api/users/u1').send({});
      expect(res.status).toBe(401);
    });

    it('allows user to update self', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'viewer-1',
        assigned_implementers: [],
      });
      mockPrisma.user.update.mockResolvedValue({ id: 'viewer-1', display_name: 'New' });

      const res = await supertest(expressApp)
        .put('/api/users/viewer-1')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ display_name: 'New' });

      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/users/:id/roles', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/users/u1/roles');
      expect(res.status).toBe(401);
    });

    it('returns roles for user', async () => {
      mockPrisma.userRole.findMany.mockResolvedValue([
        { createdAt: '2024-01-01', role: { name: 'Admin', id: 'r1' } },
      ]);

      const res = await supertest(expressApp)
        .get('/api/users/admin-1/roles')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });
  });

  describe('POST /api/users/:id/role', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).post('/api/users/u1/role').send({ roleId: 'r1' });
      expect(res.status).toBe(401);
    });

    it('adds role to user for admin', async () => {
      mockPrisma.userRole.create.mockResolvedValue({});

      const res = await supertest(expressApp)
        .post('/api/users/u1/role')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ roleId: 'r1' });

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/users/:id/role', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).delete('/api/users/u1/role').send({ roleId: 'r1' });
      expect(res.status).toBe(401);
    });

    it('removes role for admin', async () => {
      mockPrisma.userRole.delete.mockResolvedValue({});

      const res = await supertest(expressApp)
        .delete('/api/users/u1/role')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ roleId: 'r1' });

      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/users/:id/passkey', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).delete('/api/users/u1/passkey');
      expect(res.status).toBe(401);
    });

    it('deletes passkey for owner', async () => {
      mockPrisma.passkey.findUnique.mockResolvedValue({ id: 'pk1', userId: 'viewer-1' });
      mockPrisma.passkey.delete.mockResolvedValue({ id: 'pk1' });

      const res = await supertest(expressApp)
        .delete('/api/users/viewer-1/passkey')
        .set('Authorization', `Bearer ${viewerToken}`)
        .send({ pk_id: 'pk1' });

      expect(res.status).toBe(200);
    });
  });
});

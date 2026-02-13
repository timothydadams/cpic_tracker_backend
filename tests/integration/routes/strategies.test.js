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

const memberToken = await signAccessToken(
  { id: 'member-1', email: 'member@test.com', roles: ['CPIC Member'], name: 'Member' },
  '15m',
);

describe('Strategy Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRedis.exists.mockResolvedValue(0);
  });

  describe('GET /api/strategies', () => {
    it('returns all strategies', async () => {
      const strategies = [{ id: 1, title: 'Strat 1' }];
      mockPrisma.strategy.findMany.mockResolvedValue(strategies);

      const res = await supertest(expressApp).get('/api/strategies');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(strategies);
    });

    it('supports ?policy= filter', async () => {
      mockPrisma.strategy.findMany.mockResolvedValue([]);

      await supertest(expressApp).get('/api/strategies?policy=p1');

      expect(mockPrisma.strategy.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ policy_id: 'p1' }),
        }),
      );
    });
  });

  describe('GET /api/strategies/:id', () => {
    it('returns a single strategy', async () => {
      const strategy = { id: 1, title: 'Test' };
      mockPrisma.strategy.findUnique.mockResolvedValue(strategy);

      const res = await supertest(expressApp).get('/api/strategies/1');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(strategy);
    });
  });

  describe('GET /api/strategies/statuses', () => {
    it('returns enabled statuses', async () => {
      const statuses = [{ id: 1, title: 'In Progress', enabled: true }];
      mockPrisma.statusOptions.findMany.mockResolvedValue(statuses);

      const res = await supertest(expressApp).get('/api/strategies/statuses');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual(statuses);
    });
  });

  describe('GET /api/strategies/timeline_options', () => {
    it('returns enabled timeline options', async () => {
      mockPrisma.timelineOptions.findMany.mockResolvedValue([{ id: 1, title: 'Short-term' }]);

      const res = await supertest(expressApp).get('/api/strategies/timeline_options');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe('GET /api/strategies/policies', () => {
    it('returns all policies', async () => {
      mockPrisma.policies.findMany.mockResolvedValue([]);

      const res = await supertest(expressApp).get('/api/strategies/policies');

      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/strategies/focusareas', () => {
    it('returns all focus areas', async () => {
      mockPrisma.focusArea.findMany.mockResolvedValue([]);

      const res = await supertest(expressApp).get('/api/strategies/focusareas');

      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/strategies/my-strategies', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/strategies/my-strategies');
      expect(res.status).toBe(401);
    });

    it('returns strategies for authenticated user', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'member-1',
        assigned_implementers: [{ id: 1, name: 'Dept A' }],
      });
      mockPrisma.strategy.findMany.mockResolvedValue([]);

      const res = await supertest(expressApp)
        .get('/api/strategies/my-strategies')
        .set('Authorization', `Bearer ${memberToken}`);

      expect(res.status).toBe(200);
    });
  });

  describe('PUT /api/strategies/:id', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).put('/api/strategies/1').send({ content: 'Updated' });
      expect(res.status).toBe(401);
    });

    it('updates strategy fields with auth', async () => {
      const strategy = {
        id: 1, content: 'Old', status_id: 1, policy_id: 'p1',
        implementers: [],
      };
      mockPrisma.strategy.findUnique.mockResolvedValue(strategy);
      mockPrisma.strategy.update.mockResolvedValue({ ...strategy, content: 'Updated' });
      mockPrisma.strategyActivity.create.mockResolvedValue({});

      const res = await supertest(expressApp)
        .put('/api/strategies/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ content: 'Updated' });

      expect(res.status).toBe(200);
      expect(mockPrisma.strategy.update).toHaveBeenCalled();
    });

    it('handles implementer add with activity tracking', async () => {
      const strategy = {
        id: 1, content: 'Test', status_id: 1, policy_id: 'p1',
        implementers: [{ implementer_id: 1, is_primary: false }],
      };
      mockPrisma.strategy.findUnique.mockResolvedValue(strategy);
      mockPrisma.implementer.findFirst.mockResolvedValue({ name: 'Dept A' });
      mockPrisma.strategyImplementer.createMany.mockResolvedValue({ count: 1 });
      mockPrisma.strategyActivity.create.mockResolvedValue({});
      mockPrisma.strategy.update.mockResolvedValue(strategy);

      const res = await supertest(expressApp)
        .put('/api/strategies/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ implementers: { add: [2], remove: [] } });

      expect(res.status).toBe(200);
      expect(mockPrisma.strategyImplementer.createMany).toHaveBeenCalled();
    });

    it('handles primary implementer update', async () => {
      const strategy = {
        id: 1, content: 'Test', status_id: 1, policy_id: 'p1',
        implementers: [{ implementer_id: 1, is_primary: true }],
      };
      mockPrisma.strategy.findUnique.mockResolvedValue(strategy);
      mockPrisma.implementer.findFirst.mockResolvedValue({ name: 'Dept A' });
      mockPrisma.strategyImplementer.updateMany.mockResolvedValue({});
      mockPrisma.strategyActivity.create.mockResolvedValue({});
      mockPrisma.strategy.update.mockResolvedValue(strategy);

      const res = await supertest(expressApp)
        .put('/api/strategies/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ primary_implementer: 2 });

      expect(res.status).toBe(200);
      expect(mockPrisma.strategyActivity.create).toHaveBeenCalled();
    });
  });

  describe('POST /api/strategies/:id/comments', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp)
        .post('/api/strategies/1/comments')
        .send({ content: 'test' });
      expect(res.status).toBe(401);
    });

    it('creates a comment with auth', async () => {
      const comment = { id: 1, content: 'test', strategy_id: 1 };
      mockPrisma.comment.create.mockResolvedValue(comment);

      const res = await supertest(expressApp)
        .post('/api/strategies/1/comments')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ strategy_id: '1', content: 'test' });

      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/strategies/:id/comments', () => {
    it('returns comments for strategy', async () => {
      mockPrisma.comment.findMany.mockResolvedValue([
        { id: 1, parent_id: null, content: 'A comment' },
      ]);

      const res = await supertest(expressApp).get('/api/strategies/1/comments');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].children).toEqual([]);
    });

    it('nests replies under parent comments', async () => {
      const user = { id: 'u1', username: 'alice', profile_pic: null };
      mockPrisma.comment.findMany.mockResolvedValue([
        { id: 1, parent_id: null, content: 'root', user },
        { id: 2, parent_id: 1, content: 'reply', user },
        { id: 3, parent_id: 2, content: 'nested reply', user },
      ]);

      const res = await supertest(expressApp).get('/api/strategies/1/comments');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].id).toBe(1);
      expect(res.body.data[0].children).toHaveLength(1);
      expect(res.body.data[0].children[0].id).toBe(2);
      expect(res.body.data[0].children[0].children).toHaveLength(1);
      expect(res.body.data[0].children[0].children[0].id).toBe(3);
    });

    it('includes user fields on all nesting levels', async () => {
      const user = { id: 'u1', username: 'alice', profile_pic: 'pic.jpg' };
      mockPrisma.comment.findMany.mockResolvedValue([
        { id: 1, parent_id: null, content: 'root', user },
        { id: 2, parent_id: 1, content: 'reply', user },
      ]);

      const res = await supertest(expressApp).get('/api/strategies/1/comments');

      expect(res.body.data[0].user).toEqual(user);
      expect(res.body.data[0].children[0].user).toEqual(user);
    });

    it('uses PUBLIC_USER_SELECT without auth', async () => {
      mockPrisma.comment.findMany.mockResolvedValue([]);

      await supertest(expressApp).get('/api/strategies/1/comments');

      expect(mockPrisma.comment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: {
            user: {
              select: { id: true, username: true, profile_pic: true },
            },
          },
        }),
      );
    });

    it('uses AUTH_USER_SELECT with auth', async () => {
      mockPrisma.comment.findMany.mockResolvedValue([]);

      await supertest(expressApp)
        .get('/api/strategies/1/comments')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(mockPrisma.comment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: {
            user: {
              select: {
                id: true,
                username: true,
                profile_pic: true,
                display_name: true,
                given_name: true,
                family_name: true,
                email: true,
              },
            },
          },
        }),
      );
    });
  });

  describe('GET /api/strategies — orderBy validation', () => {
    it('returns 400 for invalid orderBy JSON', async () => {
      const res = await supertest(expressApp).get('/api/strategies?orderBy={invalid');
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Invalid orderBy/);
    });

    it('returns 400 for array orderBy', async () => {
      const res = await supertest(expressApp).get(
        '/api/strategies?orderBy=' + encodeURIComponent('[1,2,3]'),
      );
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Invalid orderBy/);
    });

    it('accepts valid orderBy JSON object', async () => {
      mockPrisma.strategy.findMany.mockResolvedValue([]);
      const res = await supertest(expressApp).get(
        '/api/strategies?orderBy=' + encodeURIComponent('{"createdAt":"asc"}'),
      );
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/strategies — include validation', () => {
    it('rejects invalid include relation', async () => {
      const res = await supertest(expressApp).get('/api/strategies?include=nonexistent');
      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Invalid include relation/);
    });

    it('accepts valid include relations', async () => {
      mockPrisma.strategy.findMany.mockResolvedValue([]);
      const res = await supertest(expressApp).get('/api/strategies?include=policy,status');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/strategies/:id/activities — pagination', () => {
    it('returns 401 without auth', async () => {
      const res = await supertest(expressApp).get('/api/strategies/1/activities');
      expect(res.status).toBe(401);
    });

    it('handles negative skip and oversized take', async () => {
      mockPrisma.strategyActivity.findMany.mockResolvedValue([]);

      const res = await supertest(expressApp)
        .get('/api/strategies/1/activities?skip=-5&take=999999')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('handles NaN skip and take gracefully', async () => {
      mockPrisma.strategyActivity.findMany.mockResolvedValue([]);

      const res = await supertest(expressApp)
        .get('/api/strategies/1/activities?skip=abc&take=xyz')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
    });

    it('uses AUTH_USER_SELECT for user include', async () => {
      mockPrisma.strategyActivity.findMany.mockResolvedValue([]);

      await supertest(expressApp)
        .get('/api/strategies/1/activities')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(mockPrisma.strategyActivity.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          include: {
            user: {
              select: {
                id: true,
                username: true,
                profile_pic: true,
                display_name: true,
                given_name: true,
                family_name: true,
                email: true,
              },
            },
          },
        }),
      );
    });
  });
});

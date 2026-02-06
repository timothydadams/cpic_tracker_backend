import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';
import { createMockRedis } from '../../mocks/redis.js';

const mockPrisma = createMockPrisma();
const mockRedis = createMockRedis();

vi.mock('../../../server/configs/db.js', () => ({ prisma: mockPrisma }));
vi.mock('../../../server/index.js', () => ({ redis: mockRedis }));

const supertest = (await import('supertest')).default;
const { expressApp } = await import('../../../server/express.js');

describe('Metrics Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/metrics/strategies-by-status', () => {
    it('returns strategy counts by status (public)', async () => {
      mockPrisma.strategy.groupBy.mockResolvedValue([
        { status_id: 1, _count: { id: 5 } },
      ]);
      mockPrisma.statusOptions.findMany.mockResolvedValue([
        { id: 1, title: 'In Progress' },
      ]);

      const res = await supertest(expressApp).get('/api/metrics/strategies-by-status');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([{ status: 'In Progress', count: 5 }]);
    });
  });

  describe('GET /api/metrics/strategies-by-timeline', () => {
    it('returns strategy counts by timeline (public)', async () => {
      mockPrisma.strategy.groupBy.mockResolvedValue([
        { timeline_id: 1, _count: { id: 3 } },
      ]);
      mockPrisma.timelineOptions.findMany.mockResolvedValue([
        { id: 1, title: 'Short-term' },
      ]);

      const res = await supertest(expressApp).get('/api/metrics/strategies-by-timeline');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([{ timeline: 'Short-term', count: 3 }]);
    });
  });

  describe('GET /api/metrics/implementer-breakdown', () => {
    it('returns implementer strategy counts (public)', async () => {
      mockPrisma.strategyImplementer.groupBy.mockResolvedValue([
        { implementer_id: 1, _count: { implementer_id: 7 } },
      ]);
      mockPrisma.implementer.findMany.mockResolvedValue([
        { id: 1, name: 'Dept A' },
      ]);

      const res = await supertest(expressApp).get('/api/metrics/implementer-breakdown');

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([
        { implementer_id: 1, implementer_name: 'Dept A', count: 7 },
      ]);
    });
  });

  describe('GET /api/metrics/strategy-stats-by-implementer', () => {
    it('returns strategy stats per implementer (public)', async () => {
      mockPrisma.implementer.findMany.mockResolvedValue([{ id: 1, name: 'Dept A' }]);
      mockPrisma.strategyImplementer.count.mockResolvedValue(10);
      mockPrisma.strategy.count
        .mockResolvedValueOnce(5)
        .mockResolvedValueOnce(3);

      const res = await supertest(expressApp).get('/api/metrics/strategy-stats-by-implementer');

      expect(res.status).toBe(200);
      expect(res.body.data[0].strategy_stats).toEqual({
        total: 10,
        inProgress: 5,
        completed: 3,
      });
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

// MetricsService also imports StrategyService, which also uses db.js (already mocked)
const { MetricsService } = await import('../../../server/services/metrics.js');

describe('MetricsService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getStrategyCountByTimelineId', () => {
    it('groups by timeline_id and enriches with title', async () => {
      mockPrisma.strategy.groupBy.mockResolvedValue([
        { timeline_id: 1, _count: { id: 5 } },
        { timeline_id: 2, _count: { id: 3 } },
      ]);
      mockPrisma.timelineOptions.findMany.mockResolvedValue([
        { id: 1, title: 'Short-term' },
        { id: 2, title: 'Long-term' },
      ]);

      const result = await MetricsService.getStrategyCountByTimelineId();

      expect(result).toEqual([
        { timeline: 'Short-term', count: 5 },
        { timeline: 'Long-term', count: 3 },
      ]);
    });
  });

  describe('getStratgyCountsByStatusId', () => {
    it('groups by status_id and enriches with title', async () => {
      mockPrisma.strategy.groupBy.mockResolvedValue([
        { status_id: 1, _count: { id: 10 } },
      ]);
      mockPrisma.statusOptions.findMany.mockResolvedValue([
        { id: 1, title: 'In Progress' },
      ]);

      const result = await MetricsService.getStratgyCountsByStatusId();

      expect(result).toEqual([{ status: 'In Progress', count: 10 }]);
    });
  });

  describe('getImplementerStrategyCounts', () => {
    it('groups by implementer_id and enriches with name', async () => {
      mockPrisma.strategyImplementer.groupBy.mockResolvedValue([
        { implementer_id: 1, _count: { implementer_id: 7 } },
      ]);
      mockPrisma.implementer.findMany.mockResolvedValue([
        { id: 1, name: 'Dept A' },
      ]);

      const result = await MetricsService.getImplementerStrategyCounts({});

      expect(result).toEqual([
        { implementer_id: 1, implementer_name: 'Dept A', count: 7 },
      ]);
    });
  });

  describe('getImplementerStrategyStatusCounts', () => {
    it('returns implementers with strategy stats', async () => {
      mockPrisma.implementer.findMany.mockResolvedValue([
        { id: 1, name: 'Dept A' },
      ]);
      mockPrisma.strategyImplementer.count.mockResolvedValue(10);
      mockPrisma.strategy.count
        .mockResolvedValueOnce(5)   // inProgress
        .mockResolvedValueOnce(3);  // completed

      const result = await MetricsService.getImplementerStrategyStatusCounts();

      expect(result).toHaveLength(1);
      expect(result[0].strategy_stats).toEqual({
        total: 10,
        inProgress: 5,
        completed: 3,
      });
    });
  });
});

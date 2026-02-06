import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

const { StrategyService } = await import('../../../server/services/strategies.js');

describe('StrategyService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getStrategyById', () => {
    it('calls prisma.strategy.findUnique with id', async () => {
      const mockStrategy = { id: 1, title: 'Test Strategy' };
      mockPrisma.strategy.findUnique.mockResolvedValue(mockStrategy);

      const result = await StrategyService.getStrategyById(1);

      expect(mockPrisma.strategy.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockStrategy);
    });

    it('passes include option when provided', async () => {
      mockPrisma.strategy.findUnique.mockResolvedValue({});
      const include = { policy: true };

      await StrategyService.getStrategyById(1, include);

      expect(mockPrisma.strategy.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { policy: true },
      });
    });

    it('does not include when include is null', async () => {
      mockPrisma.strategy.findUnique.mockResolvedValue({});

      await StrategyService.getStrategyById(1, null);

      expect(mockPrisma.strategy.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('updateStrategyDetails', () => {
    it('calls prisma.strategy.update with id and data', async () => {
      const data = { title: 'Updated' };
      mockPrisma.strategy.update.mockResolvedValue({ id: 1, ...data });

      const result = await StrategyService.updateStrategyDetails(1, data);

      expect(mockPrisma.strategy.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data,
      });
      expect(result.title).toBe('Updated');
    });
  });

  describe('addImplementersToStrategy', () => {
    it('calls createMany with correct data', async () => {
      mockPrisma.strategyImplementer.createMany.mockResolvedValue({ count: 2 });

      const result = await StrategyService.addImplementersToStrategy([10, 20], 5);

      expect(mockPrisma.strategyImplementer.createMany).toHaveBeenCalledWith({
        data: [
          { implementer_id: 10, strategy_id: 5 },
          { implementer_id: 20, strategy_id: 5 },
        ],
      });
      expect(result.count).toBe(2);
    });

    it('throws AppError when implementerIds is not an array', async () => {
      await expect(
        StrategyService.addImplementersToStrategy('not-array', 5)
      ).rejects.toThrow('implementerIds must be an array');
    });
  });

  describe('deleteImplementersFromStrategy', () => {
    it('calls deleteMany with in clause', async () => {
      mockPrisma.strategyImplementer.deleteMany.mockResolvedValue({ count: 1 });

      await StrategyService.deleteImplementersFromStrategy([10], 5);

      expect(mockPrisma.strategyImplementer.deleteMany).toHaveBeenCalledWith({
        where: {
          strategy_id: 5,
          implementer_id: { in: [10] },
        },
      });
    });
  });

  describe('updatePrimaryImplementer', () => {
    it('unsets all primaries then sets the new one', async () => {
      mockPrisma.strategyImplementer.updateManyAndReturn.mockResolvedValue([]);
      mockPrisma.strategyImplementer.update.mockResolvedValue({ is_primary: true });

      await StrategyService.updatePrimaryImplementer(5, 10);

      expect(mockPrisma.strategyImplementer.updateManyAndReturn).toHaveBeenCalledWith({
        where: { strategy_id: 5 },
        data: { is_primary: false },
      });
      expect(mockPrisma.strategyImplementer.update).toHaveBeenCalledWith({
        where: {
          implementer_id_strategy_id: {
            implementer_id: 10,
            strategy_id: 5,
          },
        },
        data: { is_primary: true },
      });
    });
  });

  describe('getStrategiesForImplementer', () => {
    it('queries with implementer_id', async () => {
      mockPrisma.strategy.findMany.mockResolvedValue([]);

      await StrategyService.getStrategiesForImplementer(10);

      expect(mockPrisma.strategy.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            implementers: {
              some: { implementer_id: 10 },
            },
          },
        }),
      );
    });

    it('includes is_primary filter when provided', async () => {
      mockPrisma.strategy.findMany.mockResolvedValue([]);

      await StrategyService.getStrategiesForImplementer(10, true);

      expect(mockPrisma.strategy.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            implementers: {
              some: { implementer_id: 10, is_primary: true },
            },
          },
        }),
      );
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

const { StrategyActivityService } = await import('../../../server/services/strategyActivity.js');

describe('StrategyActivityService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('creates an activity record with coerced strategy_id', async () => {
      const mockCreated = { id: 1, strategy_id: 5, action: 'UPDATE' };
      mockPrisma.strategyActivity.create.mockResolvedValue(mockCreated);

      const result = await StrategyActivityService.create({
        strategy_id: '5',
        user_id: 'user-1',
        action: 'UPDATE',
        summary: 'Updated strategy',
        changes: {},
      });

      expect(mockPrisma.strategyActivity.create).toHaveBeenCalledWith({
        data: {
          strategy_id: 5,
          user_id: 'user-1',
          action: 'UPDATE',
          summary: 'Updated strategy',
          changes: {},
        },
      });
      expect(result).toEqual(mockCreated);
    });
  });

  describe('update', () => {
    it('updates an activity by id', async () => {
      const mockUpdated = { id: 1, summary: 'Updated' };
      mockPrisma.strategyActivity.update.mockResolvedValue(mockUpdated);

      const result = await StrategyActivityService.update(1, { summary: 'Updated' });

      expect(mockPrisma.strategyActivity.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { summary: 'Updated' },
      });
      expect(result).toEqual(mockUpdated);
    });
  });

  describe('fetchByStrategyId', () => {
    it('fetches activities with default pagination and PUBLIC_USER_SELECT', async () => {
      mockPrisma.strategyActivity.findMany.mockResolvedValue([]);

      await StrategyActivityService.fetchByStrategyId(1);

      expect(mockPrisma.strategyActivity.findMany).toHaveBeenCalledWith({
        where: { strategy_id: 1 },
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 50,
        include: {
          user: {
            select: { id: true, username: true, profile_pic: true },
          },
        },
      });
    });

    it('accepts custom skip, take, and userSelect', async () => {
      mockPrisma.strategyActivity.findMany.mockResolvedValue([]);
      const userSelect = { id: true, display_name: true };

      await StrategyActivityService.fetchByStrategyId(2, { skip: 10, take: 25, userSelect });

      expect(mockPrisma.strategyActivity.findMany).toHaveBeenCalledWith({
        where: { strategy_id: 2 },
        orderBy: { createdAt: 'desc' },
        skip: 10,
        take: 25,
        include: {
          user: { select: userSelect },
        },
      });
    });

    it('coerces strategy_id to number', async () => {
      mockPrisma.strategyActivity.findMany.mockResolvedValue([]);

      await StrategyActivityService.fetchByStrategyId('3');

      expect(mockPrisma.strategyActivity.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where: { strategy_id: 3 } }),
      );
    });
  });

  describe('fetchByUserId', () => {
    it('fetches activities by user with default pagination', async () => {
      mockPrisma.strategyActivity.findMany.mockResolvedValue([]);

      await StrategyActivityService.fetchByUserId('user-1');

      expect(mockPrisma.strategyActivity.findMany).toHaveBeenCalledWith({
        where: { user_id: 'user-1' },
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 50,
        include: { strategy: true },
      });
    });

    it('accepts custom skip and take', async () => {
      mockPrisma.strategyActivity.findMany.mockResolvedValue([]);

      await StrategyActivityService.fetchByUserId('user-1', { skip: 5, take: 10 });

      expect(mockPrisma.strategyActivity.findMany).toHaveBeenCalledWith({
        where: { user_id: 'user-1' },
        orderBy: { createdAt: 'desc' },
        skip: 5,
        take: 10,
        include: { strategy: true },
      });
    });
  });
});

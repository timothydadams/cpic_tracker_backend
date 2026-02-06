import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

const { ImplementerService } = await import('../../../server/services/implementers.js');

describe('ImplementerService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getImplementerStrategies', () => {
    it('returns primary and support strategies', async () => {
      // The service calls StrategyService.getStrategiesForImplementer which uses mockPrisma
      mockPrisma.strategy.findMany
        .mockResolvedValueOnce([{ id: 1, title: 'Primary Strategy' }])  // primary
        .mockResolvedValueOnce([{ id: 2, title: 'Support Strategy' }]); // support

      const result = await ImplementerService.getImplementerStrategies(10);

      expect(result.primary).toEqual([{ id: 1, title: 'Primary Strategy' }]);
      expect(result.support).toEqual([{ id: 2, title: 'Support Strategy' }]);
    });
  });

  describe('getImplementerDetails', () => {
    it('returns implementer by id', async () => {
      mockPrisma.implementer.findFirst.mockResolvedValue({ id: 10, name: 'Dept A' });

      const result = await ImplementerService.getImplementerDetails(10);

      expect(mockPrisma.implementer.findFirst).toHaveBeenCalledWith({
        where: { id: 10 },
      });
      expect(result.name).toBe('Dept A');
    });
  });
});

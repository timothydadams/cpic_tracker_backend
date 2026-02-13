import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

const { PolicyService } = await import('../../../server/services/policies.js');

describe('PolicyService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getById', () => {
    it('returns policy with area and strategies when found', async () => {
      const mockPolicy = { id: 'p1', description: 'Test', area: {}, strategies: [] };
      mockPrisma.policies.findUnique.mockResolvedValue(mockPolicy);

      const result = await PolicyService.getById('p1');

      expect(mockPrisma.policies.findUnique).toHaveBeenCalledWith({
        where: { id: 'p1' },
        include: { area: true, strategies: true },
      });
      expect(result).toEqual(mockPolicy);
    });

    it('throws AppError 404 when not found', async () => {
      mockPrisma.policies.findUnique.mockResolvedValue(null);

      await expect(PolicyService.getById('missing')).rejects.toThrow('policy not found');
    });
  });

  describe('getAll', () => {
    it('returns all policies', async () => {
      const mockPolicies = [{ id: 'p1' }, { id: 'p2' }];
      mockPrisma.policies.findMany.mockResolvedValue(mockPolicies);

      const result = await PolicyService.getAll();

      expect(mockPrisma.policies.findMany).toHaveBeenCalledWith({ include: {} });
      expect(result).toEqual(mockPolicies);
    });

    it('passes include options', async () => {
      mockPrisma.policies.findMany.mockResolvedValue([]);

      await PolicyService.getAll({ area: true });

      expect(mockPrisma.policies.findMany).toHaveBeenCalledWith({
        include: { area: true },
      });
    });
  });

  describe('create', () => {
    it('creates a policy', async () => {
      const data = { description: 'New', policy_number: 1, focus_area_id: 1 };
      const mockCreated = { id: 'p1', ...data };
      mockPrisma.policies.create.mockResolvedValue(mockCreated);

      const result = await PolicyService.create(data);

      expect(mockPrisma.policies.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(mockCreated);
    });
  });

  describe('update', () => {
    it('updates a policy by id', async () => {
      const data = { description: 'Updated' };
      const mockUpdated = { id: 'p1', ...data };
      mockPrisma.policies.update.mockResolvedValue(mockUpdated);

      const result = await PolicyService.update('p1', data);

      expect(mockPrisma.policies.update).toHaveBeenCalledWith({
        where: { id: 'p1' },
        data,
      });
      expect(result).toEqual(mockUpdated);
    });
  });

  describe('delete', () => {
    it('deletes a policy by id', async () => {
      const mockDeleted = { id: 'p1' };
      mockPrisma.policies.delete.mockResolvedValue(mockDeleted);

      const result = await PolicyService.delete('p1');

      expect(mockPrisma.policies.delete).toHaveBeenCalledWith({
        where: { id: 'p1' },
      });
      expect(result).toEqual(mockDeleted);
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

const { FocusAreaService } = await import('../../../server/services/focus_areas.js');

describe('FocusAreaService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getById', () => {
    it('returns focus area when found', async () => {
      const mockFA = { id: 1, name: 'Test Area' };
      mockPrisma.focusArea.findUnique.mockResolvedValue(mockFA);

      const result = await FocusAreaService.getById(1);

      expect(mockPrisma.focusArea.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockFA);
    });

    it('passes include when provided', async () => {
      mockPrisma.focusArea.findUnique.mockResolvedValue({ id: 1 });

      await FocusAreaService.getById(1, { policies: true });

      expect(mockPrisma.focusArea.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { policies: true },
      });
    });

    it('omits include when null', async () => {
      mockPrisma.focusArea.findUnique.mockResolvedValue({ id: 1 });

      await FocusAreaService.getById(1, null);

      expect(mockPrisma.focusArea.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('throws AppError 404 when not found', async () => {
      mockPrisma.focusArea.findUnique.mockResolvedValue(null);

      await expect(FocusAreaService.getById(999)).rejects.toThrow('focus area not found');
    });
  });

  describe('getAll', () => {
    it('returns all focus areas', async () => {
      const mockAreas = [{ id: 1 }, { id: 2 }];
      mockPrisma.focusArea.findMany.mockResolvedValue(mockAreas);

      const result = await FocusAreaService.getAll();

      expect(mockPrisma.focusArea.findMany).toHaveBeenCalledWith({ include: {} });
      expect(result).toEqual(mockAreas);
    });

    it('passes include options', async () => {
      mockPrisma.focusArea.findMany.mockResolvedValue([]);

      await FocusAreaService.getAll({ policies: true });

      expect(mockPrisma.focusArea.findMany).toHaveBeenCalledWith({
        include: { policies: true },
      });
    });
  });

  describe('create', () => {
    it('creates a focus area', async () => {
      const data = { name: 'New Area', description: 'Desc' };
      const mockCreated = { id: 1, ...data };
      mockPrisma.focusArea.create.mockResolvedValue(mockCreated);

      const result = await FocusAreaService.create(data);

      expect(mockPrisma.focusArea.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(mockCreated);
    });
  });

  describe('update', () => {
    it('updates a focus area by id', async () => {
      const data = { name: 'Updated' };
      const mockUpdated = { id: 1, ...data };
      mockPrisma.focusArea.update.mockResolvedValue(mockUpdated);

      const result = await FocusAreaService.update(1, data);

      expect(mockPrisma.focusArea.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data,
      });
      expect(result).toEqual(mockUpdated);
    });
  });

  describe('delete', () => {
    it('deletes a focus area by id', async () => {
      const mockDeleted = { id: 1 };
      mockPrisma.focusArea.delete.mockResolvedValue(mockDeleted);

      const result = await FocusAreaService.delete(1);

      expect(mockPrisma.focusArea.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockDeleted);
    });
  });
});

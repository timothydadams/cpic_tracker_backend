import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

const { CommentService } = await import('../../../server/services/comments.js');

describe('CommentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getById', () => {
    it('returns comment when found', async () => {
      const mockComment = { id: 1, content: 'test', user_id: 'user-1', strategy_id: 1 };
      mockPrisma.comment.findUnique.mockResolvedValue(mockComment);

      const result = await CommentService.getById(1);

      expect(mockPrisma.comment.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockComment);
    });

    it('throws AppError 404 when not found', async () => {
      mockPrisma.comment.findUnique.mockResolvedValue(null);

      await expect(CommentService.getById(999)).rejects.toThrow('Comment not found');
    });

    it('passes include when provided', async () => {
      mockPrisma.comment.findUnique.mockResolvedValue({ id: 1 });
      const include = { children: true };

      await CommentService.getById(1, include);

      expect(mockPrisma.comment.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { children: true },
      });
    });

    it('omits include when null', async () => {
      mockPrisma.comment.findUnique.mockResolvedValue({ id: 1 });

      await CommentService.getById(1, null);

      expect(mockPrisma.comment.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });

  describe('getAll', () => {
    it('returns array of comments', async () => {
      const mockComments = [
        { id: 1, content: 'first' },
        { id: 2, content: 'second' },
      ];
      mockPrisma.comment.findMany.mockResolvedValue(mockComments);

      const result = await CommentService.getAll();

      expect(result).toEqual(mockComments);
    });

    it('passes include when provided', async () => {
      mockPrisma.comment.findMany.mockResolvedValue([]);
      const include = { children: { include: { children: true } } };

      await CommentService.getAll(include);

      expect(mockPrisma.comment.findMany).toHaveBeenCalledWith({
        include: { children: { include: { children: true } } },
      });
    });

    it('omits include when null', async () => {
      mockPrisma.comment.findMany.mockResolvedValue([]);

      await CommentService.getAll(null);

      expect(mockPrisma.comment.findMany).toHaveBeenCalledWith({});
    });
  });

  describe('create', () => {
    it('creates comment and coerces strategy_id to Number', async () => {
      const mockCreated = { id: 1, content: 'new', strategy_id: 5, user_id: 'user-1' };
      mockPrisma.comment.create.mockResolvedValue(mockCreated);

      const result = await CommentService.create({
        strategy_id: '5',
        content: 'new',
        user_id: 'user-1',
      });

      expect(mockPrisma.comment.create).toHaveBeenCalledWith({
        data: {
          strategy_id: 5,
          content: 'new',
          user_id: 'user-1',
        },
      });
      expect(result).toEqual(mockCreated);
    });

    it('spreads remaining data fields including parent_id', async () => {
      mockPrisma.comment.create.mockResolvedValue({ id: 2 });

      await CommentService.create({
        strategy_id: 1,
        content: 'reply',
        user_id: 'user-1',
        parent_id: 1,
      });

      expect(mockPrisma.comment.create).toHaveBeenCalledWith({
        data: {
          strategy_id: 1,
          content: 'reply',
          user_id: 'user-1',
          parent_id: 1,
        },
      });
    });
  });

  describe('update', () => {
    it('updates comment by id', async () => {
      const mockUpdated = { id: 1, content: 'updated' };
      mockPrisma.comment.update.mockResolvedValue(mockUpdated);

      const result = await CommentService.update(1, { content: 'updated' });

      expect(mockPrisma.comment.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { content: 'updated' },
      });
      expect(result).toEqual(mockUpdated);
    });
  });

  describe('delete', () => {
    it('deletes comment by id', async () => {
      const mockDeleted = { id: 1 };
      mockPrisma.comment.delete.mockResolvedValue(mockDeleted);

      const result = await CommentService.delete(1);

      expect(mockPrisma.comment.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockDeleted);
    });
  });
});

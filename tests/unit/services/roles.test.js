import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

vi.mock('../../../server/utils/auth.js', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual };
});

const { RoleService } = await import('../../../server/services/roles.js');

describe('RoleService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('findRoleByName', () => {
    it('queries by name', async () => {
      mockPrisma.role.findUnique.mockResolvedValue({ id: 'r1', name: 'Admin' });

      const result = await RoleService.findRoleByName('Admin');

      expect(mockPrisma.role.findUnique).toHaveBeenCalledWith({
        where: { name: 'Admin' },
      });
      expect(result.name).toBe('Admin');
    });
  });

  describe('getUserRoles', () => {
    it('returns roles for userId', async () => {
      const mockRoles = [{ role: { name: 'Admin', id: 'r1' } }];
      mockPrisma.userRole.findMany.mockResolvedValue(mockRoles);

      const result = await RoleService.getUserRoles('u1');

      expect(mockPrisma.userRole.findMany).toHaveBeenCalledWith({
        where: { user_id: 'u1' },
        include: {
          role: { select: { name: true, id: true } },
        },
      });
      expect(result).toEqual(mockRoles);
    });
  });

  describe('addRoleToUser', () => {
    it('creates userRole join', async () => {
      mockPrisma.userRole.create.mockResolvedValue({});

      await RoleService.addRoleToUser('u1', 'r1');

      expect(mockPrisma.userRole.create).toHaveBeenCalledWith({
        data: {
          user: { connect: { id: 'u1' } },
          role: { connect: { id: 'r1' } },
        },
      });
    });
  });

  describe('removeRoleFromUser', () => {
    it('deletes userRole by composite key', async () => {
      mockPrisma.userRole.delete.mockResolvedValue({});

      await RoleService.removeRoleFromUser('u1', 'r1');

      expect(mockPrisma.userRole.delete).toHaveBeenCalledWith({
        where: {
          user_id_role_id: {
            user_id: 'u1',
            role_id: 'r1',
          },
        },
      });
    });
  });
});

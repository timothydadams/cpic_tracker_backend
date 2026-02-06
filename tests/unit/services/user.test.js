import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

// Mock hashPassword since user.js imports it
vi.mock('../../../server/utils/auth.js', async (importOriginal) => {
  const actual = await importOriginal();
  return { ...actual };
});

const { UserService } = await import('../../../server/services/user.js');

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getUserById', () => {
    it('calls findUnique with id and include', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'u1', email: 'test@test.com' });

      const result = await UserService.getUserById('u1', { include: { userRoles: true } });

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'u1' },
        include: { userRoles: true },
      });
      expect(result.id).toBe('u1');
    });

    it('passes select option', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 'u1' });

      await UserService.getUserById('u1', { select: { email: true } });

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'u1' },
        select: { email: true },
      });
    });

    it('omits include/select when null', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({});

      await UserService.getUserById('u1', {});

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 'u1' },
      });
    });
  });

  describe('updateUser', () => {
    it('calls prisma.user.update', async () => {
      mockPrisma.user.update.mockResolvedValue({ id: 'u1', display_name: 'New Name' });

      const result = await UserService.updateUser('u1', { display_name: 'New Name' });

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'u1' },
        data: { display_name: 'New Name' },
      });
      expect(result.display_name).toBe('New Name');
    });
  });

  describe('deletePasskey', () => {
    it('calls prisma.passkey.delete', async () => {
      mockPrisma.passkey.delete.mockResolvedValue({ id: 'pk1' });

      const result = await UserService.deletePasskey('pk1');

      expect(mockPrisma.passkey.delete).toHaveBeenCalledWith({
        where: { id: 'pk1' },
      });
      expect(result.id).toBe('pk1');
    });
  });

  describe('updateAssignedImplementers', () => {
    it('updates user with set of implementer ids', async () => {
      mockPrisma.user.update.mockResolvedValue({});

      await UserService.updateAssignedImplementers('u1', [1, 2]);

      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'u1' },
        data: {
          assigned_implementers: {
            set: [{ id: 1 }, { id: 2 }],
          },
        },
      });
    });
  });

  describe('getAllUsers', () => {
    it('returns users without roles by default', async () => {
      const users = [{ id: 'u1' }, { id: 'u2' }];
      mockPrisma.user.findMany.mockResolvedValue(users);

      const result = await UserService.getAllUsers();

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith({ include: {} });
      expect(result).toEqual(users);
    });

    it('returns users with flattened roles when includeRoles is true', async () => {
      const users = [
        {
          id: 'u1',
          email: 'test@test.com',
          userRoles: [{ role: { name: 'Admin' } }, { role: { name: 'CPIC Admin' } }],
        },
      ];
      mockPrisma.user.findMany.mockResolvedValue(users);

      const result = await UserService.getAllUsers({ includeRoles: true });

      expect(result[0].roles).toEqual(['Admin', 'CPIC Admin']);
      expect(result[0].userRoles).toBeUndefined();
    });
  });
});

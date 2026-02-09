import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

vi.mock('../../../server/utils/auth.js', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    hashPassword: vi.fn().mockResolvedValue('hashed-pw'),
    getAuthedGoogleClient: vi.fn(),
  };
});

vi.mock('googleapis', () => ({
  google: {
    oauth2: vi.fn(() => ({
      userinfo: { get: vi.fn() },
    })),
  },
}));

const { AuthService } = await import('../../../server/services/auth.js');

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSocialLoginOptions', () => {
    it('returns provider names from federated_idps', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        federated_idps: [{ name: 'google' }, { name: 'github' }],
      });

      const result = await AuthService.getSocialLoginOptions('test@test.com');
      expect(result).toEqual(['google', 'github']);
    });

    it('returns empty array when user not found', async () => {
      mockPrisma.user.findUnique.mockRejectedValue(new Error('not found'));

      const result = await AuthService.getSocialLoginOptions('missing@test.com');
      expect(result).toEqual([]);
    });

    it('returns empty array when federated_idps is not array', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ federated_idps: null });

      const result = await AuthService.getSocialLoginOptions('test@test.com');
      expect(result).toEqual([]);
    });
  });

  describe('findUserForSignIn', () => {
    it('returns user with flattened roles', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        email: 'test@test.com',
        userRoles: [{ role: { name: 'Admin' } }],
      });

      const result = await AuthService.findUserForSignIn('u1');

      expect(result.id).toBe('u1');
      expect(result.roles).toEqual(['Admin']);
      expect(result.userRoles).toBeUndefined();
    });

    it('returns null when user not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const result = await AuthService.findUserForSignIn('missing');
      expect(result).toBeNull();
    });

    it('queries by custom key', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        userRoles: [{ role: { name: 'Viewer' } }],
      });

      await AuthService.findUserForSignIn('test@test.com', 'email');

      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ email: 'test@test.com', disabled: false }),
        }),
      );
    });
  });

  describe('findExistingUserPasskeys', () => {
    it('returns passkeys for user', async () => {
      const passkeys = [{ id: 'pk1' }, { id: 'pk2' }];
      mockPrisma.passkey.findMany.mockResolvedValue(passkeys);

      const result = await AuthService.findExistingUserPasskeys('u1');
      expect(result).toEqual(passkeys);
      expect(mockPrisma.passkey.findMany).toHaveBeenCalledWith({
        where: { userId: 'u1' },
      });
    });

    it('returns empty array on error', async () => {
      mockPrisma.passkey.findMany.mockRejectedValue(new Error('db error'));

      const result = await AuthService.findExistingUserPasskeys('u1');
      expect(result).toEqual([]);
    });
  });

  describe('addPasskey', () => {
    it('creates passkey record', async () => {
      const data = { id: 'pk1', userId: 'u1', publicKey: new Uint8Array([1]) };
      mockPrisma.passkey.create.mockResolvedValue(data);

      const result = await AuthService.addPasskey(data);
      expect(mockPrisma.passkey.create).toHaveBeenCalledWith({ data });
      expect(result).toEqual(data);
    });
  });

  describe('savePasskeyCounter', () => {
    it('updates counter on passkey', async () => {
      mockPrisma.passkey.update.mockResolvedValue({ id: 'pk1', counter: 5 });

      await AuthService.savePasskeyCounter('pk1', 5);

      expect(mockPrisma.passkey.update).toHaveBeenCalledWith({
        where: { id: 'pk1' },
        data: { counter: 5 },
      });
    });
  });

  describe('getUserPasskey', () => {
    it('finds passkey by userId and credId', async () => {
      mockPrisma.passkey.findFirst.mockResolvedValue({ id: 'pk1' });

      const result = await AuthService.getUserPasskey('u1', 'pk1');

      expect(mockPrisma.passkey.findFirst).toHaveBeenCalledWith({
        where: { userId: 'u1', id: 'pk1' },
      });
      expect(result.id).toBe('pk1');
    });
  });

  describe('register', () => {
    it('creates user in transaction with role', async () => {
      const userData = {
        email: 'new@test.com',
        given_name: 'New',
        family_name: 'User',
        assigned_implementers: [1],
      };

      const createdUser = { id: 'new-u1', email: 'new@test.com' };

      mockPrisma.$transaction.mockImplementation(async (fn) => {
        const tx = {
          user: { create: vi.fn().mockResolvedValue(createdUser) },
          userRole: { create: vi.fn().mockResolvedValue({}) },
        };
        return fn(tx);
      });

      // Mock findUserForSignIn for the return value
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'new-u1',
        email: 'new@test.com',
        userRoles: [{ role: { name: 'Viewer' } }],
      });

      const result = await AuthService.register(userData, { roleId: 'role-1', inviteCode: 'abc' });

      expect(mockPrisma.$transaction).toHaveBeenCalled();
      expect(result.id).toBe('new-u1');
      expect(result.roles).toEqual(['Viewer']);
    });
  });

  describe('findAndUpdateUserWithFederatedId', () => {
    it('updates user with federated identity', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        federated_idps: [{ name: 'github', data: {} }],
      });
      mockPrisma.user.update.mockResolvedValue({ id: 'u1' });

      await AuthService.findAndUpdateUserWithFederatedId(
        'test@test.com',
        'google',
        'g-123',
        { email: 'test@test.com' },
      );

      expect(mockPrisma.user.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'u1' },
          data: {
            federated_idps: expect.arrayContaining([
              { name: 'github', data: {} },
              { name: 'google', data: { email: 'test@test.com' } },
            ]),
          },
        }),
      );
    });

    it('replaces existing provider entry', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 'u1',
        federated_idps: [{ name: 'google', data: { old: true } }],
      });
      mockPrisma.user.update.mockResolvedValue({ id: 'u1' });

      await AuthService.findAndUpdateUserWithFederatedId(
        'test@test.com',
        'google',
        'g-123',
        { email: 'test@test.com' },
      );

      // The old google entry should be filtered out and replaced
      const updateCall = mockPrisma.user.update.mock.calls[0][0];
      const googleEntries = updateCall.data.federated_idps.filter((x) => x.name === 'google');
      expect(googleEntries).toHaveLength(1);
      expect(googleEntries[0].data.email).toBe('test@test.com');
    });
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockPrisma } from '../../mocks/prisma.js';

const mockPrisma = createMockPrisma();
vi.mock('../../../server/configs/db.js', () => ({
  prisma: mockPrisma,
}));

vi.mock('uuid', () => ({
  v4: vi.fn(() => 'mock-uuid-1234'),
}));

const { InviteCodeService } = await import('../../../server/services/invites.js');

describe('InviteCodeService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('generateCode', () => {
    it('returns a UUID', () => {
      expect(InviteCodeService.generateCode()).toBe('mock-uuid-1234');
    });
  });

  describe('create', () => {
    it('creates invite code with defaults', async () => {
      mockPrisma.inviteCode.create.mockResolvedValue({ id: 1, code: 'mock-uuid-1234' });

      await InviteCodeService.create('user-1');

      expect(mockPrisma.inviteCode.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            code: 'mock-uuid-1234',
            maxUses: 1,
            createdById: 'user-1',
          }),
        }),
      );
    });

    it('uses custom code when provided', async () => {
      mockPrisma.inviteCode.create.mockResolvedValue({});

      await InviteCodeService.create('user-1', { code: 'custom-code' });

      expect(mockPrisma.inviteCode.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ code: 'custom-code' }),
        }),
      );
    });
  });

  describe('validate', () => {
    it('returns valid: false for nonexistent code', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue(null);

      const result = await InviteCodeService.validate('bad-code');
      expect(result.valid).toBe(false);
    });

    it('returns valid: false for expired code', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue({
        id: 1,
        expiresAt: new Date('2020-01-01'),
        useCount: 0,
        maxUses: 1,
      });

      const result = await InviteCodeService.validate('expired');
      expect(result.valid).toBe(false);
    });

    it('returns valid: false for fully used code', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue({
        id: 1,
        expiresAt: null,
        useCount: 5,
        maxUses: 5,
      });

      const result = await InviteCodeService.validate('used-up');
      expect(result.valid).toBe(false);
    });

    it('returns valid: true for valid code', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue({
        id: 1,
        roleId: 'r1',
        expiresAt: new Date('2099-01-01'),
        useCount: 0,
        maxUses: 5,
        role: { name: 'Viewer' },
        createdBy: { id: 'u1', email: 'admin@test.com' },
      });

      const result = await InviteCodeService.validate('valid-code');
      expect(result.valid).toBe(true);
      expect(result.invite.roleId).toBe('r1');
      expect(result.invite.roleName).toBe('Viewer');
    });
  });

  describe('markAsUsed', () => {
    it('throws when code not found', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue(null);

      await expect(InviteCodeService.markAsUsed('bad', 'u1')).rejects.toThrow('Invite code not found');
    });

    it('increments useCount in transaction', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue({
        id: 1,
        useCount: 0,
        maxUses: 5,
        createdById: 'creator-1',
      });
      mockPrisma.$transaction.mockResolvedValue([]);

      await InviteCodeService.markAsUsed('code', 'u1');

      expect(mockPrisma.$transaction).toHaveBeenCalled();
    });
  });

  describe('getWithStats', () => {
    it('queries inviteCode with createdBy and usedBy', async () => {
      mockPrisma.inviteCode.findUnique.mockResolvedValue({ id: 1 });

      await InviteCodeService.getWithStats('code');

      expect(mockPrisma.inviteCode.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { code: 'code' },
          include: expect.objectContaining({
            createdBy: expect.any(Object),
            usedBy: expect.any(Object),
          }),
        }),
      );
    });
  });

  describe('getByCreator', () => {
    it('returns codes created by user', async () => {
      mockPrisma.inviteCode.findMany.mockResolvedValue([]);

      await InviteCodeService.getByCreator('u1');

      expect(mockPrisma.inviteCode.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ createdById: 'u1' }),
          orderBy: { createdAt: 'desc' },
        }),
      );
    });

    it('filters active-only when specified', async () => {
      mockPrisma.inviteCode.findMany.mockResolvedValue([]);

      await InviteCodeService.getByCreator('u1', { activeOnly: true });

      expect(mockPrisma.inviteCode.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            createdById: 'u1',
            used: false,
            expiresAt: expect.any(Object),
          }),
        }),
      );
    });
  });

  describe('getInvitedUsers', () => {
    it('returns users invited by userId', async () => {
      mockPrisma.user.findMany.mockResolvedValue([]);

      await InviteCodeService.getInvitedUsers('u1');

      expect(mockPrisma.user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { invitedById: 'u1' },
          orderBy: { createdAt: 'desc' },
        }),
      );
    });
  });
});

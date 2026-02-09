import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMockReq, createMockRes, createMockNext } from '../../mocks/express.js';

vi.mock('../../../server/services/invites.js', () => ({
  InviteCodeService: {
    validate: vi.fn(),
  },
}));

const { InviteCodeService } = await import('../../../server/services/invites.js');
const { requireInviteCode } = await import('../../../server/middleware/inviteCodeMiddleware.js');

describe('requireInviteCode', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('throws AppError when inviteCode is missing', async () => {
    const req = createMockReq({ body: {} });
    const res = createMockRes();
    const next = createMockNext();

    await expect(requireInviteCode(req, res, next)).rejects.toThrow('Invite code required');
  });

  it('throws AppError when validation fails', async () => {
    InviteCodeService.validate.mockResolvedValue({
      valid: false,
      reason: 'Invite code has expired',
    });

    const req = createMockReq({ body: { inviteCode: 'expired-code' } });
    const res = createMockRes();
    const next = createMockNext();

    await expect(requireInviteCode(req, res, next)).rejects.toThrow('Invite code has expired');
  });

  it('attaches inviteDetails and calls next() for valid code', async () => {
    const inviteData = { id: 'inv-1', roleId: 'role-1', roleName: 'Viewer', createdBy: {} };
    InviteCodeService.validate.mockResolvedValue({
      valid: true,
      invite: inviteData,
    });

    const req = createMockReq({ body: { inviteCode: 'valid-code' } });
    const res = createMockRes();
    const next = createMockNext();

    await requireInviteCode(req, res, next);

    expect(req.body.inviteDetails).toEqual(inviteData);
    expect(next).toHaveBeenCalled();
  });
});

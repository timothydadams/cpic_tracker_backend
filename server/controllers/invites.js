import { prisma } from "../configs/db.js";
import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../policies/focusAreas.js";
import { parseBoolean } from "../utils/queryStringParsers.js";
import { v4 } from "uuid";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

export const InviteCodeService = {
  // Generate a random invite code
  generateCode() {
    return v4();
  },

  // Create a new invite code
  async create(createdById, options = {}) {
    const code = options.code || this.generateCode();
    
    return await prisma.inviteCode.create({
      data: {
        code,
        roleId: options.roleId,
        maxUses: options.maxUses || 1,
        expiresAt: options.expiresAt || null,
        createdById
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
  },

  // Validate an invite code
  async validate(code) {
    const invite = await prisma.inviteCode.findUnique({
      where: { code },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });
    
    if (!invite) {
      return { valid: false, reason: 'Invalid invite code' };
    }
    
    if (invite.expiresAt && new Date() > invite.expiresAt) {
      return { valid: false, reason: 'Invite code has expired' };
    }
    
    if (invite.useCount >= invite.maxUses) {
      return { valid: false, reason: 'Invite code has been fully used' };
    }
    
    return { 
      valid: true, 
      invite: {
        id: invite.id,
        roleId: invite.roleId,
        createdBy: invite.createdBy
      }
    };
  },

  // Mark invite code as used and link users
  async markAsUsed(code, userId) {
    const invite = await prisma.inviteCode.findUnique({
      where: { code }
    });

    if (!invite) {
      throw new Error('Invite code not found');
    }

    const newUseCount = invite.useCount + 1;
    const isFullyUsed = newUseCount >= invite.maxUses;

    await prisma.$transaction([
      // Increment use count and mark as used if needed
      prisma.inviteCode.update({
        where: { id: invite.id },
        data: {
          useCount: newUseCount,
          used: isFullyUsed
        }
      }),
      // Link the new user to the invite code and the inviter
      prisma.user.update({
        where: { id: userId },
        data: {
          inviteCodeId: invite.id,
          invitedById: invite.createdById
        }
      })
    ]);

    return invite;
  },

  // Get invite code with usage stats
  async getWithStats(code) {
    return await prisma.inviteCode.findUnique({
      where: { code },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true
          }
        },
        usedBy: {
          select: {
            id: true,
            email: true,
            createdAt: true
          }
        }
      }
    });
  },

  // Get all invite codes created by a user
  async getByCreator(userId) {
    return await prisma.inviteCode.findMany({
      where: { createdById: userId },
      include: {
        usedBy: {
          select: {
            id: true,
            email: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  // Get users invited by a specific user
  async getInvitedUsers(userId) {
    return await prisma.user.findMany({
      where: { invitedById: userId },
      select: {
        id: true,
        email: true,
        createdAt: true,
        inviteCodeUsed: {
          select: {
            code: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }
};

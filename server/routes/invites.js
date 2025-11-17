import { Router } from 'express';
import { verifyToken } from '../middleware/requireAuth.js';
import { 
    InviteCodeService
} from "../services/invites.js";
import { parseBoolean } from '../utils/queryStringParsers.js';
import { AppError } from '../errors/AppError.js';
import { handleResponse } from '../utils/defaultResponse.js';


const InvitesRouter = Router();

// Create invite code
InvitesRouter.post('/', [verifyToken], async (req, res) => {
  try {
    const userId = res.locals.user.id
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { 
        maxUses = 1, 
        expiresInDays = 7,
        roleId,
    } = req.body;
    
    const options = {
      roleId,
      maxUses: Number(maxUses),
      expiresAt: expiresInDays 
        ? new Date(Date.now() + Number(expiresInDays) * 24 * 60 * 60 * 1000)
        : null
    };

    const inviteCode = await InviteCodeService.create(userId, options);
    handleResponse(res, 201, "invite code created", inviteCode);
  } catch (error) {
    console.error('Create invite error:', error);
    handleResponse(res, 500, "failed to create invite code");
  }
});

InvitesRouter.get('/my-codes', [verifyToken], async (req, res) => {
    try {
        const userId = res.locals.user.id
        const activeOnly = parseBoolean(req.query.activeOnly);

        const options = {activeOnly};
    
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const codes = await InviteCodeService.getByCreator(userId, options);
        handleResponse(res, 200, "invite codes retrieved", codes);
    } catch (error) {
        console.error('Get invite codes error:', error);
        handleResponse(res, 500, "failed to fetch invite codes");
    }
});

InvitesRouter.get('/my-invites', [verifyToken], async (req, res) => {
  try {
    const userId = res.locals.user.id
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const invitedUsers = await InviteCodeService.getInvitedUsers(userId);
    handleResponse(res, 200, "invited users retrieved", {
      count: invitedUsers.length,
      users: invitedUsers
    });

  } catch (error) {
    console.error('Get invited users error:', error);
    handleResponse(res, 500, "failed to fetch invited users");
  }
});

InvitesRouter.get("/:code/validate", async(req,res,next) => {
    const { code } = req.params;
    if (!code) {
        return res.status(400).json({error:"invite code was not provided"});
    }

    try {
        const validationResults = await InviteCodeService.validate(code);
        const { error } = validationResults;
        if (error) {
            throw new AppError(error.reason, error.httpcode);
        }
        const { valid, invite: {roleId, roleName}} = validationResults;
        handleResponse(res, 200, "validation complete", {valid, roleId, roleName});
    } catch (error) {
        next(error)
    }
});

InvitesRouter.get('/:code/stats', [verifyToken], async (req, res, next) => {
  try {
    const userId = res.locals.user.id
    const {isGlobalAdmin, isCPICAdmin} = res.locals.user;
    
    if (!userId || !isGlobalAdmin || !isCPICAdmin) {
      throw new AppError("Unauthorized", 401);
    }

    const invite = await InviteCodeService.getWithStats(req.params.code);
    
    if (!invite || invite.createdById !== userId) {
        throw new AppError("Invite code not found", 404);
    }
    handleResponse(res, "stats retrieved", invite);
  } catch (e) {
    console.error('Get invite stats error:', e);
    next(e)
  }
});



//InvitesRouter.post("/:id", [verifyToken], createImplementer);

//InvitesRouter.put('/:id', [verifyToken], updateImplementer);

//InvitesRouter.delete('/:id', [verifyToken], deleteImplementer);

export default InvitesRouter;
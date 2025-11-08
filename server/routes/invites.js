import { Router } from 'express';
import { verifyToken } from '../middleware/requireAuth.js';
import { 
    InviteCodeService
} from "../services/invites.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}


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
    
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const codes = await InviteCodeService.getByCreator(userId);
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

InvitesRouter.get("/:code/validate", async(req,res) => {
    try {
        const validation = await InviteCodeService.validate(req.params.code);
        const { valid, invite: {roleId}} = validation;
        handleResponse(res, 200, "validation complete", {valid, roleId});
        //res.json(validation);
    } catch (error) {
        console.error('Validate invite error:', error);
        handleResponse(res, 500, "Failed to validate invite code");
    }
});

InvitesRouter.get('/:code/stats', [verifyToken], async (req, res) => {
  try {
    const userId = res.locals.user.id
    const {isGlobalAdmin, isCPICAdmin} = res.locals.user;
    
    if (!userId || !isGlobalAdmin || !isCPICAdmin) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const invite = await InviteCodeService.getWithStats(req.params.code);
    
    if (!invite || invite.createdById !== userId) {
      return res.status(404).json({ error: 'Invite code not found' });
    }
    res.json(invite);
  } catch (e) {
    console.error('Get invite stats error:', e);
    res.status(500).json({
      error: 'Failed to fetch invite code'
    });
  }
});



//InvitesRouter.post("/:id", [verifyToken], createImplementer);

//InvitesRouter.put('/:id', [verifyToken], updateImplementer);

//InvitesRouter.delete('/:id', [verifyToken], deleteImplementer);

export default InvitesRouter;
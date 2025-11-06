import { InviteCodeService } from "../controllers/invites.js";


export const requireInviteCode = async (req, res, next) => {
  const { inviteCode } = req.body;

  if (!inviteCode) {
    return res.status(400).json({
      error: 'Invite code is required'
    });
  }

  const validation = await InviteCodeService.validate(inviteCode);
  
  if (!validation.valid) {
    return res.status(403).json({
      error: validation.reason
    });
  }

  const { invite } = validation;

  req.body.inviteDetails = {
    ...invite
  }

  next();
};
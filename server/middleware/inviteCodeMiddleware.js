import { InviteCodeService } from "../services/invites.js";
import { AppError } from "../errors/AppError.js";


export const requireInviteCode = async (req, res, next) => {
  const { inviteCode } = req.body;

  if (!inviteCode) {
    throw new AppError("Invite code required", 400);
  }

  const validation = await InviteCodeService.validate(inviteCode);
  
  if (!validation.valid) {
    throw new AppError(validation.reason, 403)
  }

  const { invite } = validation;

  req.body.inviteDetails = {
    ...invite
  }

  next();
};
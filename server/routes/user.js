import { Router } from 'express';
import { requireGlobalAdmin, verifyToken } from '../middleware/requireAuth.js';
import { requireInviteCode } from '../middleware/inviteCodeMiddleware.js';

import { 
    handleUpdateUser,
    handleGetUser,
    handleGetAllUsers,
    addRoleToUser,
    removeRoleFromUser,
    getUserRoles,
    registerNewUser,
} from '../controllers/user.js';

const UserRouter = Router();

UserRouter.post('/register', [requireInviteCode], registerNewUser);

UserRouter.get('/', [verifyToken, requireGlobalAdmin], handleGetAllUsers);
UserRouter.get('/:id', [verifyToken], handleGetUser);
UserRouter.put('/:id', [verifyToken], handleUpdateUser);

UserRouter.get('/:id/roles', [verifyToken], getUserRoles);
UserRouter.post('/:id/role', [verifyToken], addRoleToUser);
UserRouter.delete('/:id/role',[verifyToken], removeRoleFromUser);

export default UserRouter;

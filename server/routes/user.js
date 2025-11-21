import { Router } from 'express';
import { requireGlobalAdmin, verifyToken } from '../middleware/requireAuth.js';

import { 
    handleUpdateUser,
    handleGetUser,
    handleGetAllUsers,
    addRoleToUser,
    removeRoleFromUser,
    getUserRoles,
    deleteUserPasskey,
} from '../controllers/user.js';

const UserRouter = Router();


UserRouter.get('/', [verifyToken], handleGetAllUsers);
UserRouter.get('/:id', [verifyToken], handleGetUser);
UserRouter.put('/:id', [verifyToken], handleUpdateUser);

UserRouter.get('/:id/roles', [verifyToken], getUserRoles);
UserRouter.post('/:id/role', [verifyToken], addRoleToUser);
UserRouter.delete('/:id/role',[verifyToken], removeRoleFromUser);
UserRouter.delete('/:id/passkey', [verifyToken], deleteUserPasskey);

export default UserRouter;

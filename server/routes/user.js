import { Router } from 'express';
import { requireGlobalAdmin, verifyToken } from '../middleware/requireAuth.js';

import { 
    handleUpdateUser,
    handleGetUser,
    handleGetAllUsers,
    handleCreateUser,
    addRoleToUser,
    removeRoleFromUser,
    getUserRoles,
} from '../controllers/user.js';

const UserRouter = Router();

UserRouter.post('/', handleCreateUser);
UserRouter.get('/', [verifyToken, requireGlobalAdmin], handleGetAllUsers);
UserRouter.get('/:id', [verifyToken], handleGetUser);
UserRouter.put('/:id', [verifyToken], handleUpdateUser);

UserRouter.get('/:id/roles', [verifyToken, requireGlobalAdmin], getUserRoles);

UserRouter.post('/:id/role', [verifyToken, requireGlobalAdmin], addRoleToUser);
UserRouter.delete('/:id/role',[[verifyToken, requireGlobalAdmin]],removeRoleFromUser);


//UserRouter.delete('/:id', handleDeleteUser);
//UserRouter.get('/:id', handleGetUser);



export default UserRouter;

//app.use('/api', [protect], apiRouter)
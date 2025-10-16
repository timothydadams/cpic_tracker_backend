import { Router } from 'express';
import { 
    viewAllRoles,
    viewRole,
    createRole,
    updateRole,
    deleteRole,
} from "../controllers/roles.js";
import { verifyToken } from '../middleware/requireAuth.js';


const RolesRouter = Router();

RolesRouter.get("/", [verifyToken], viewAllRoles);
RolesRouter.get('/:id', [verifyToken], viewRole);
RolesRouter.post("/", [verifyToken], createRole)
RolesRouter.put('/:id', [verifyToken], updateRole);
RolesRouter.delete("/:id", [verifyToken], deleteRole);

export default RolesRouter;

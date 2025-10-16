import { Router } from 'express';
import {
    viewAllPolicies,
    viewPolicy,
    createPolicy,
    updatePolicy,
    deletePolicy,
} from "../controllers/policies.js"
import { verifyToken } from '../middleware/requireAuth.js';

const PolicyRouter = Router();

PolicyRouter.get("/", viewAllPolicies);
PolicyRouter.get('/:id', viewPolicy);
PolicyRouter.post("/", [verifyToken], createPolicy);
PolicyRouter.put('/:id', [verifyToken], updatePolicy);
PolicyRouter.delete("/:id", [verifyToken], deletePolicy);

export default PolicyRouter;
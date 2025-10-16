import { Router } from 'express';
import { 
    viewAllImplementers,
    viewImplementer,
    updateImplementer,
    createImplementer,
    deleteImplementer,
} from "../controllers/implementers.js";
import { verifyToken } from '../middleware/requireAuth.js';


const ImplementerRouter = Router();

ImplementerRouter.get("/", viewAllImplementers);
ImplementerRouter.get('/:id', viewImplementer);
ImplementerRouter.post("/:id", [verifyToken], createImplementer);
ImplementerRouter.put('/:id', [verifyToken], updateImplementer);
ImplementerRouter.delete('/:id', [verifyToken], deleteImplementer);

export default ImplementerRouter;
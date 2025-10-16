import { Router } from 'express';
import {
    viewAllFocusAreas,
    viewFocusArea,
    createFocusArea,
    updateFocusArea,
    deleteFocusArea,
} from "../controllers/focus_areas.js";
import { verifyToken } from '../middleware/requireAuth.js';

const FocusAreaRouter = Router();

FocusAreaRouter.get("/", viewAllFocusAreas);
FocusAreaRouter.get('/:id', viewFocusArea);
FocusAreaRouter.post("/", [verifyToken], createFocusArea);
FocusAreaRouter.put('/:id', [verifyToken], updateFocusArea);
FocusAreaRouter.delete("/:id", [verifyToken], deleteFocusArea);

export default FocusAreaRouter;
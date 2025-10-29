import { Router } from 'express';
import {
    viewAllFAQs,
    viewFAQ,
    createFAQ,
    updateFAQ,
    deleteFAQ,
} from "../controllers/faq.js";
import { verifyToken } from '../middleware/requireAuth.js';

const FaqRouter = Router();

FaqRouter.get("/", );
FaqRouter.get('/:id', );
FaqRouter.post("/", [verifyToken], );
FaqRouter.put('/:id', [verifyToken], );
FaqRouter.delete("/:id", [verifyToken], );

export default FaqRouter;
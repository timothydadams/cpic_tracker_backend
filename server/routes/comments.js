import { Router } from 'express';
import {
    viewAllComments,
    viewComment,
    createComment,
    updateComment,
    deleteComment,
} from "../controllers/comments.js";
import { verifyToken } from '../middleware/requireAuth.js';

const CommentsRouter = Router();

CommentsRouter.get("/", [verifyToken], viewAllComments);
CommentsRouter.get('/:id', viewComment);
CommentsRouter.post("/", [verifyToken], createComment);
CommentsRouter.put('/:id', [verifyToken], updateComment);
CommentsRouter.delete("/:id", [verifyToken], deleteComment);

export default CommentsRouter;
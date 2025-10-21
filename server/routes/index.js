import { Router } from 'express';
import { verifyToken } from '../middleware/requireAuth.js';
import AuthRouter from './auth.js';
import UserRouter from './user.js';
import StrategyRouter from './strategy.js';
import RolesRouter from './roles.js';
import PolicyRouter from './policies.js';
import FocusAreaRouter from './focus_areas.js';
import ImplementerRouter from './implementers.js';
import CommentsRouter from './comments.js';

const AppRouter = Router();

AppRouter.use('/auth', AuthRouter);
AppRouter.use('/users', UserRouter);
AppRouter.use('/roles', RolesRouter);
AppRouter.use('/strategies', StrategyRouter);
AppRouter.use('/policies', PolicyRouter);
AppRouter.use('/focusareas', FocusAreaRouter);
AppRouter.use('/implementers', ImplementerRouter);
AppRouter.use('/comments', CommentsRouter);


export default AppRouter;
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

AppRouter.use('/api/auth', AuthRouter);
AppRouter.use('/api/users', UserRouter);
AppRouter.use('/api/roles', RolesRouter);
AppRouter.use('/api/strategies', StrategyRouter);
AppRouter.use('/api/policies', PolicyRouter);
AppRouter.use('/api/focusareas', FocusAreaRouter);
AppRouter.use('/api/implementers', ImplementerRouter);
AppRouter.use('/api/comments', CommentsRouter);


export default AppRouter;
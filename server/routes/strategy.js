import { Router } from 'express';
import { 
    viewAllStrategies,
    viewStrategy,
    updateStrategy,
    viewStrategyStatuses,
    viewTimelineOptions,
    viewFocusAreas,
    viewPolicies,
    viewStrategyComments,
} from "../controllers/strategies.js";

import {
    createComment,
} from '../controllers/comments.js';
import { verifyToken } from '../middleware/requireAuth.js';


const StrategyRouter = Router();

StrategyRouter.get("/", viewAllStrategies);
StrategyRouter.get('/statuses', viewStrategyStatuses);
StrategyRouter.get('/timeline_options', viewTimelineOptions);
StrategyRouter.get('/policies', viewPolicies);
StrategyRouter.get('/focusareas', viewFocusAreas);
StrategyRouter.get('/:id', viewStrategy);
StrategyRouter.put('/:id', [verifyToken], updateStrategy);

StrategyRouter.post('/:id/comments', [verifyToken], createComment)
StrategyRouter.get('/:id/comments', viewStrategyComments);

export default StrategyRouter;

//app.use('/api', [protect], apiRouter)
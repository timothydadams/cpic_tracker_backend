import { Router } from 'express';
import {
    viewAllStrategies,
    viewStrategy,
    handleUpdateStrategy,
    viewStrategyStatuses,
    viewTimelineOptions,
    viewFocusAreas,
    viewPolicies,
    viewStrategyComments,
    viewMyStrategies,
    viewStrategyActivities,
} from "../controllers/strategies.js";

import {
    createComment,
} from '../controllers/comments.js';
import { verifyToken } from '../middleware/requireAuth.js';
import { prisma } from '../configs/db.js';


const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const StrategyRouter = Router();

StrategyRouter.get("/", viewAllStrategies);

StrategyRouter.get("/my-strategies", [verifyToken], viewMyStrategies);

StrategyRouter.get('/statuses', viewStrategyStatuses);
StrategyRouter.get('/timeline_options', viewTimelineOptions);
StrategyRouter.get('/policies', viewPolicies);
StrategyRouter.get('/focusareas', viewFocusAreas);
StrategyRouter.get('/:id', viewStrategy);
StrategyRouter.put('/:id', [verifyToken], handleUpdateStrategy);
StrategyRouter.post('/:id/comments', [verifyToken], createComment)
StrategyRouter.get('/:id/comments', viewStrategyComments);
StrategyRouter.get('/:id/activities', [verifyToken], viewStrategyActivities);

export default StrategyRouter;

//app.use('/api', [protect], apiRouter)
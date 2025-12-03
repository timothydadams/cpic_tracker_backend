import { Router } from 'express';
import {
    viewStrategyStatusMetrics,
    viewStrategyByTimelineMetrics,
    viewAllImplementerMetrics,
    viewStrategyStatusesByImplementer
} from "../controllers/metrics.js";
//import { verifyToken } from '../middleware/requireAuth.js';

const MetricsRouter = Router();

MetricsRouter.get("/strategies-by-status",  viewStrategyStatusMetrics);
//MetricsRouter.get("/strategies-last-x-days", viewRecentStrategyActivity);
MetricsRouter.get("/strategies-by-timeline", viewStrategyByTimelineMetrics);
MetricsRouter.get("/implementer-breakdown",  viewAllImplementerMetrics);
MetricsRouter.get("/strategy-stats-by-implementer", viewStrategyStatusesByImplementer);
//MetricsRouter.post("/", [verifyToken], createComment);
//MetricsRouter.put('/:id', [verifyToken], updateComment);
//MetricsRouter.delete("/:id", [verifyToken], deleteComment);

export default MetricsRouter;
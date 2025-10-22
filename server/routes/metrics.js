import { Router } from 'express';
import {
    viewStrategyStatusMetrics,
    viewStrategyByTimelineMetrics,
    viewAllImplementerMetrics
} from "../controllers/metrics.js";
//import { verifyToken } from '../middleware/requireAuth.js';

const MetricsRouter = Router();

MetricsRouter.get("/strategies-by-status",  viewStrategyStatusMetrics);
MetricsRouter.get("/strategies-by-timeline", viewStrategyByTimelineMetrics);
MetricsRouter.get("/implementer-breakdown",  viewAllImplementerMetrics);
//MetricsRouter.post("/", [verifyToken], createComment);
//MetricsRouter.put('/:id', [verifyToken], updateComment);
//MetricsRouter.delete("/:id", [verifyToken], deleteComment);

export default MetricsRouter;
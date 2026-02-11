import { parseBoolean } from "../utils/queryStringParsers.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { MetricsService } from "../services/metrics.js";


export const viewStrategyByTimelineMetrics = async (req,res) => {
    const metrics = await MetricsService.getStrategyCountByTimelineId();
    handleResponse(res, 200, "macro strategy metrics retrieved successfully", metrics);
};

export const viewStrategyStatusMetrics = async(req,res) => {
    const metrics = await MetricsService.getStratgyCountsByStatusId()
    handleResponse(res, 200, "strategy status metrics retrieved successfully", metrics);
}

export const viewAllImplementerMetrics = async(req,res) => {
    const primary = parseBoolean(req.query.primary);
    const whereClause = {
        ...(primary ? { is_primary: true} : {}),
    }

    const metrics = await MetricsService.getImplementerStrategyCounts(whereClause);
    handleResponse(res, 200, "metrics retrieved successfully", metrics);
}


export const viewStrategyStatusesByImplementer = async(req,res) => {
    const primary = parseBoolean(req.query.primary);
    const whereClause = {
        ...(primary ? { is_primary: true} : {}),
    }

    const metrics = await MetricsService.getImplementerStrategyStatusCounts(whereClause);
    handleResponse(res, 200, "metrics retrieved successfully", metrics);
}

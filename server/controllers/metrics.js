import { parseBoolean } from "../utils/queryStringParsers.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { MetricsService } from "../services/metrics.js";


export const viewStrategyByTimelineMetrics = async (req,res,next) => {
    try {
      const metrics = await MetricsService.getStrategyCountByTimelineId();
      handleResponse(res, 200, "macro strategy metrics retrieved successfully", metrics);
    } catch(e) {
      return next(e)
    }
};

export const viewStrategyStatusMetrics = async(req,res,next) => {
  try {
    const metrics = await MetricsService.getStratgyCountsByStatusId()
    handleResponse(res, 200, "strategy status metrics retrieved successfully", metrics);
  } catch(e){
    return next(e)
  }
}

export const viewAllImplementerMetrics = async(req,res,next) => {
    const primary = parseBoolean(req.query.primary);
    const whereClause = {
        ...(primary ? { is_primary: true} : {}),
    }

    try {
      const metrics = await MetricsService.getImplementerStrategyCounts(whereClause);
      handleResponse(res, 200, "metrics retrieved successfully", metrics);
    } catch(e) {
      return next(e)
    }
}


export const viewStrategyStatusesByImplementer = async(req,res,next) => {
    const primary = parseBoolean(req.query.primary);
    const whereClause = {
        ...(primary ? { is_primary: true} : {}),
    }

    try {
      const metrics = await MetricsService.getImplementerStrategyStatusCounts(whereClause);
      handleResponse(res, 200, "metrics retrieved successfully", metrics);
    } catch(e) {
      return next(e)
    }
}

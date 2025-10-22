import { prisma } from "../configs/db.js";
//import { authorize } from "../middleware/authorize.js";
//import { canCreate, canRead, canReadAll, canUpdate, canDelete } from "../policies/comments.js";
import { parseBoolean } from "../utils/queryStringParsers.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}


export const viewStrategyByTimelineMetrics = async (req,res) => {

    const strategiesByStatus = await prisma.strategy.groupBy({
        by: ['timeline_id'],
        _count: {
            id: true, // count strategies in each status_id
        },
    });

    const foreignKeyIds = strategiesByStatus.map((item) => item.timeline_id);

    const relatedModels = await prisma.timelineOptions.findMany({
      where: {
        id: {
          in: foreignKeyIds,
        },
      },
      select: {
        id: true,
        title: true,
      },
    });

    const mergedResults = strategiesByStatus.map((item) => {
      const related = relatedModels.find((r) => r.id === item.timeline_id);
      return {
        timeline: related.title,
        count: item._count.id
      };
    });

    console.log(mergedResults);
    
    handleResponse(res, 200, "metrics retrieved successfully", mergedResults);
};


export const viewStrategyStatusMetrics = async(req,res) => {


    const strategiesByStatus = await prisma.strategy.groupBy({
        by: ['status_id'],
        _count: {
            id: true, // count strategies in each status_id
        },
    });

    const foreignKeyIds = strategiesByStatus.map((item) => item.status_id);

    const relatedModels = await prisma.statusOptions.findMany({
      where: {
        id: {
          in: foreignKeyIds,
        },
      },
      select: {
        id: true,
        title: true,
      },
    });

    const mergedResults = strategiesByStatus.map((item) => {
      const related = relatedModels.find((r) => r.id === item.status_id);
      return {
        //...item,
        //...related, // Attach the related model data
        status: related.title,
        count: item._count.id
      };
    });

    console.log(mergedResults);
    
    handleResponse(res, 200, "metrics retrieved successfully", mergedResults);
    /*
    const children = parseBoolean(req.query.replies);
    
    const includeItems = {
        ...(children ? { children:{ include: {children: true}}} : {}),
    }
    
    authorize(canReadAll)(req, res, async () => {
        const comments = await prisma.comment.findMany({
            include:includeItems
        });
        handleResponse(res, 200, "comments retrieved successfully", comments);
    });
    */
}

export const viewAllImplementerMetrics = async(req,res) => {
    const primary = parseBoolean(req.query.primary);
    const whereClause = {
        ...(primary ? { is_primary: true} : {}),
    }

    const implementerBreakdown = await prisma.strategyImplementer.groupBy({
        where: whereClause,
        by: ['implementer_id'],
        _count: {
            implementer_id: true,
        },
        orderBy: {
            _count: {
                implementer_id: 'desc', // Order by the count in descending order
            },
        },
    });

    const foreignKeyIds = implementerBreakdown.map((item) => item.implementer_id);

    const relatedModels = await prisma.implementer.findMany({
      where: {
        id: {
          in: foreignKeyIds,
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const mergedResults = await Promise.all(implementerBreakdown.map(async(item) => {
      const relatedImplementer = relatedModels.find((r) => r.id === item.implementer_id);
      const relatedStrategies = await prisma.strategyImplementer.findMany({
        where: {
            implementer_id: item.implementer_id,
            ...(primary ? {is_primary:true}:{}),
        },
        include:{
            strategy:true,
        }
      });

      return {
        implementer_id: relatedImplementer.id,
        implementer_name: relatedImplementer.name,
        count: item._count.implementer_id,
        strategies: relatedStrategies.map(s => s.strategy),
      };
    }));

    console.log(mergedResults);
    
    handleResponse(res, 200, "metrics retrieved successfully", mergedResults);

}
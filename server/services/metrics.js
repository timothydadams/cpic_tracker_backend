import { prisma } from "../configs/db.js";
import { StrategyService } from "./strategies.js";
import { AppError } from "../errors/AppError.js";

export const MetricsService = {
    
    async getStrategyCountByTimelineId(whereClause = {}) {
        try {
            const strategiesByStatus = await prisma.strategy.groupBy({
                by: ['timeline_id'],
                where: whereClause,
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
            });

            return strategiesByStatus.map((item) => {
                const related = relatedModels.find((r) => r.id === item.timeline_id);
                return {
                    timeline: related.title,
                    count: item._count.id
                };
            });

        } catch(e) {
            throw e
        }
    },

    async getStratgyCountsByStatusId(whereClause = {}){
        try {
            const strategiesByStatus = await prisma.strategy.groupBy({
                where: whereClause,
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
            });

            return strategiesByStatus.map((item) => {
                const related = relatedModels.find((r) => r.id === item.status_id);
                return {
                    //...item,
                    //...related, // Attach the related model data
                    status: related.title,
                    count: item._count.id
                };
            });
        }catch(e){
            throw e
        }
    },

    async getImplementerStrategyCounts(whereClause){
        try {
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
            });

            return implementerBreakdown.map((item) => {
                const relatedImplementer = relatedModels.find((r) => r.id === item.implementer_id);
                return {
                    implementer_id: relatedImplementer.id,
                    implementer_name: relatedImplementer.name,
                    count: item._count.implementer_id,
                };
            });
        } catch(e) {
            throw e
        }
    },

    async getImplementerStrategyStatusCounts() {
        try {
            const implementers = await prisma.implementer.findMany({});

            const impsWithStrategiesStats = await Promise.all(
                implementers.map( async imp => {
                    const totalStratCount = await prisma.strategyImplementer.count({
                        where: {
                            implementer_id: imp.id
                        }
                    });

                    const stratsInProgress =  await prisma.strategy.count({
                        where: {
                            status: {
                                title: {
                                    equals:"In Progress"
                                },
                            },
                            implementers: {
                                some: {
                                    implementer_id: imp.id,
                                }
                            }
                        }
                    });

                    const stratsCompleted =  await prisma.strategy.count({
                        where: {
                            status: {
                                title: {
                                    equals:"Completed"
                                },
                            },
                            implementers: {
                                some: {
                                    implementer_id: imp.id,
                                }
                            }
                        }
                    });

                    /*
                    const strategies = await this.getStratgyCountsByStatusId({
                        implementers: {
                            some: {
                                implementer_id: imp.id,
                            }
                        }
                    });
                    */
                    return {
                        ...imp,
                        strategy_stats: {
                            total:totalStratCount,
                            inProgress: stratsInProgress,
                            completed:stratsCompleted,
                        },
                    }
                })
            );

        

            return impsWithStrategiesStats

        } catch(e) {
            throw e
        }
    },
};
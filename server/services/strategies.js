import { prisma } from "../configs/db.js";
import { AppError } from "../errors/AppError.js";

export const StrategyService = {

    async getStrategyById(id, include = null) {
        return await prisma.strategy.findUnique({
            where: { id },
            ...(include ? { include } : {}),
        });
    },

    async getAll({ where = {}, include = {}, orderBy = null } = {}) {
        return await prisma.strategy.findMany({
            where,
            include,
            ...(orderBy ? { orderBy } : {}),
        });
    },

    async create(data) {
        return await prisma.strategy.create({ data });
    },

    async delete(id) {
        return await prisma.strategy.delete({
            where: { id },
        });
    },

    async updateStrategyDetails(id, data) {
        return await prisma.strategy.update({
            where: { id },
            data,
        });
    },

    async getStatuses() {
        return await prisma.statusOptions.findMany({
            where: { enabled: true },
        });
    },

    async getTimelineOptions() {
        return await prisma.timelineOptions.findMany({
            where: { enabled: true },
        });
    },

    async getCommentsByStrategyId(strategyId, include = {}) {
        return await prisma.comment.findMany({
            where: { strategy_id: strategyId },
            include,
        });
    },

    async addImplementersToStrategy(implementerIds, strategyId) {
        if (!Array.isArray(implementerIds)) {
            throw new AppError("implementerIds must be an array of implementer ids");
        }

        const data = implementerIds.map(id => ({
            implementer_id: id,
            strategy_id: strategyId,
        }));

        return await prisma.strategyImplementer.createMany({ data });
    },

    async deleteImplementersFromStrategy(implementerIds, strategyId) {
        return await prisma.strategyImplementer.deleteMany({
            where: {
                strategy_id: strategyId,
                implementer_id: {
                    in: implementerIds,
                },
            },
        });
    },

    async _unsetPrimaryImplementer(strategy_id) {
        return prisma.strategyImplementer.updateManyAndReturn({
            where: { strategy_id },
            data: { is_primary: false },
        });
    },

    async updatePrimaryImplementer(strategy_id, primary_implementer_id) {
        await this._unsetPrimaryImplementer(strategy_id);
        return await prisma.strategyImplementer.update({
            where: {
                implementer_id_strategy_id: {
                    implementer_id: Number(primary_implementer_id),
                    strategy_id,
                },
            },
            data: { is_primary: true },
        });
    },

    async getStrategiesForImplementer(implementer_id, is_primary = null) {
        return await prisma.strategy.findMany({
            where: {
                implementers: {
                    some: {
                        implementer_id,
                        ...(is_primary !== null ? { is_primary } : {}),
                    },
                },
            },
            include: {
                status: true,
                focus_area: true,
                policy: true,
                timeline: true,
                implementers: {
                    include: {
                        implementer: true,
                    },
                },
            },
        });
    },

};

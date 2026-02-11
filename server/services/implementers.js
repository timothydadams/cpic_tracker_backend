import { prisma } from "../configs/db.js";
import { StrategyService } from "./strategies.js";
import { AppError } from "../errors/AppError.js";

export const ImplementerService = {

    async getById(id, include = null) {
        const imp = await prisma.implementer.findUnique({
            where: { id },
            ...(include != null && { include }),
        });
        if (!imp) throw new AppError("implementer not found", 404);
        return imp;
    },

    async getAll(include = {}) {
        return await prisma.implementer.findMany({
            include,
        });
    },

    async create(data) {
        return await prisma.implementer.create({ data });
    },

    async update(id, data) {
        return await prisma.implementer.update({
            where: { id },
            data,
        });
    },

    async delete(id) {
        return await prisma.implementer.delete({
            where: { id },
        });
    },

    async getImplementerName(implementerId) {
        return prisma.implementer.findFirst({
            where: { id: Number(implementerId) },
            select: { name: true },
        });
    },

    async getImplementerStrategies(implementer_id) {
        const results = {};
        results.primary = await StrategyService.getStrategiesForImplementer(implementer_id, true);
        results.support = await StrategyService.getStrategiesForImplementer(implementer_id, false);
        return results;
    },

    async getImplementerDetails(id) {
        return await prisma.implementer.findFirst({
            where: { id },
        });
    },

};
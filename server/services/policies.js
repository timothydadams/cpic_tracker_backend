import { prisma } from "../configs/db.js";
import { AppError } from "../errors/AppError.js";

export const PolicyService = {

    async getById(id) {
        const policy = await prisma.policies.findUnique({
            where: { id },
            include: {
                area: true,
                strategies: true,
            },
        });
        if (!policy) throw new AppError("policy not found", 404);
        return policy;
    },

    async getAll(include = {}) {
        return await prisma.policies.findMany({
            include,
        });
    },

    async create(data) {
        return await prisma.policies.create({ data });
    },

    async update(id, data) {
        return await prisma.policies.update({
            where: { id },
            data,
        });
    },

    async delete(id) {
        return await prisma.policies.delete({
            where: { id },
        });
    },

};

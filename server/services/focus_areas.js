import { prisma } from "../configs/db.js";
import { AppError } from "../errors/AppError.js";

export const FocusAreaService = {

    async getById(id, include = null) {
        const fa = await prisma.focusArea.findUnique({
            where: { id },
            ...(include != null && { include }),
        });
        if (!fa) throw new AppError("focus area not found", 404);
        return fa;
    },

    async getAll(include = {}) {
        return await prisma.focusArea.findMany({
            include,
        });
    },

    async create(data) {
        return await prisma.focusArea.create({ data });
    },

    async update(id, data) {
        return await prisma.focusArea.update({
            where: { id },
            data,
        });
    },

    async delete(id) {
        return await prisma.focusArea.delete({
            where: { id },
        });
    },

};

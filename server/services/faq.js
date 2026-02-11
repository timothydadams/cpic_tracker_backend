import { prisma } from "../configs/db.js";
import { AppError } from "../errors/AppError.js";

export const FAQService = {

    async getById(id) {
        const faq = await prisma.faq.findUnique({
            where: { id },
        });
        if (!faq) throw new AppError("faq not found", 404);
        return faq;
    },

    async getAll() {
        return await prisma.faq.findMany({});
    },

    async create(data) {
        return await prisma.faq.create({ data });
    },

    async update(id, data) {
        return await prisma.faq.update({
            where: { id },
            data,
        });
    },

    async delete(id) {
        return await prisma.faq.delete({
            where: { id },
        });
    },

};

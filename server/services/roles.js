import { prisma } from "../configs/db.js";
import { AppError } from "../errors/AppError.js";

export const RoleService = {

    async getById(id) {
        const role = await prisma.role.findUnique({
            where: { id }
        });
        if (!role) throw new AppError("role not found", 404);
        return role;
    },

    async getAll() {
        return await prisma.role.findMany();
    },

    async create(data) {
        return await prisma.role.create({ data });
    },

    async update(id, data) {
        return await prisma.role.update({
            where: { id },
            data,
        });
    },

    async delete(id) {
        return await prisma.role.delete({
            where: { id },
        });
    },

    async findRoleByName(name) {
        return await prisma.role.findUnique({
            where: { name },
        });
    },

    async getUserRoles(userId) {
        return await prisma.userRole.findMany({
            where: {
                user_id: userId,
            },
            include: {
                role: {
                    select: {
                        name: true,
                        id: true,
                    }
                }
            }
        });
    },

    async addRoleToUser(userId, roleId) {
        return await prisma.userRole.create({
            data: {
                user: { connect: { id: userId } },
                role: { connect: { id: roleId } }
            }
        });
    },

    async removeRoleFromUser(userId, roleId) {
        return await prisma.userRole.delete({
            where: {
                user_id_role_id: {
                    user_id: userId,
                    role_id: roleId,
                }
            },
        });
    },

};
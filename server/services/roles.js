import { prisma } from "../configs/db.js";
import { hashPassword } from "../utils/auth.js";
import { AppError } from "../errors/AppError.js";

export const RoleService = {

    async findRoleByName(name) {
        try {
            return await prisma.role.findUnique({
                where:{
                    name
                },
            });
        } catch(error){
            throw error
        }
    },

    async getUserRoles(userId) {
        try {
            return await prisma.userRole.findMany({
                where: {
                    user_id:userId,
                },
                include: {
                    role: {
                        select: {
                            name:true
                        }
                    }
                }
            });
        } catch(error){
            throw error
        }
    },

    async addRoleToUser(userId, roleId) {
        try {
            return prisma.userRole.create({
                data: {
                    user:{connect: {id: userId}},
                    role: {connect: {id: roleId}}
                }
            });
        } catch (error) {
            throw error
        }
    },

    async removeRoleFromUser(userId, roleId) {
        try {
            return await prisma.userRole.delete({
                where: {
                    user_id_role_id: {
                        user_id:userId,
                        role_id:roleId,
                    }
                },
            });
        } catch(error){
            throw error
        }
    },

};
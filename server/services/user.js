import { prisma } from "../configs/db.js";
import { hashPassword } from "../utils/auth.js";
import { AppError } from "../errors/AppError.js";

export const UserService = {
   
    async updateUser(id, data) {
        try {
            return await prisma.user.update({
                where: {
                    id
                },
                data,
            })
        } catch(e) {
            console.log(e)
            throw e
        }
    },

    async updateAssignedImplementers(userId, implementerIdArray){
        try {
            return await prisma.user.update({
                where: { id: userId },
                data: {
                    assigned_implementers: {
                        set: implementerIdArray.map(id => ({id: Number(id)})), // Replace all authors with these two
                    },
                },
            });
        } catch(e){
            throw e
        }
    },
    

    async getUserById(id, {include = null, select = null}) {
        try {
            return await prisma.user.findUnique({
                where:{
                    id
                },
                ...(include ? {include} : {}),
                ...(select ? {select} : {}),
            });
        } catch (error) {
            throw error
        }
    },

    async getAllUsers(options = {}){
        const { includeRoles = false } = options;

        const include = {
            ...(includeRoles 
                ? {
                    userRoles: {
                        include: {
                            role: {
                                select:{
                                    name:true,
                                }
                            },
                        }
                    }
                } : {}),
        };

        try {
            const users = await prisma.user.findMany({
                include
            });

            if (includeRoles) {
                //update role array
                return users.map(({userRoles, ...u}) => {
                    return {
                        ...u,
                        roles: userRoles.map(({role}) => role.name),
                    }
                });
            } else {
                return users;
            }

        } catch(error) {
            throw error
        }

    },

};
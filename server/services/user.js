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
    

    async getUserById(id, includedItems = null) {
        try {
            return await prisma.user.findUnique({
                where:{
                    id
                },
                ...(includedItems != null && {select:includedItems}),
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
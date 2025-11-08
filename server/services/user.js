import { prisma } from "../configs/db.js";
import { hashPassword } from "../utils/auth.js";
import { AppError } from "../errors/AppError.js";

export const UserService = {
   
    async register(userData, options = {}) {
        const {
            email,
            family_name,
            given_name,
            password
        } = userData;

        const { roleId, inviteCode } = options;

        try {

            const hashed = await hashPassword(password);

            const newUser = await prisma.$transaction(async (tx) => {
                //create the user
                const user = await tx.user.create({
                    data: {
                        email,
                        family_name,
                        given_name,
                        display_name: `${given_name} ${family_name}`,
                        password_hash: hashed,
                    }
                });

                // Assign the role (explicit m-n join table)
                await tx.userRole.create({
                    data: {
                        user:{connect: {id: user.id}},
                        role: {connect: {id: roleId}}
                    }
                });

                return user;
            });

            return await this.findUserForSignIn(newUser.id);

        } catch (error) {
            //provide invite code on error obj so server can redirect to proper
            //register page from google oauth callback
            error.data = {inviteCode}
            throw error
        }
    },

    //Get user with friendly roles array
    async findUserForSignIn(val, key = "id") {
        const whereClause = {}
        whereClause.disabled = false;
        whereClause[key] = val;

        const includeItems = {
            userRoles: {
                include: {
                    role: {
                        select:{
                            name:true,
                        }
                    },
                }
            },
        }

        try {
            const validUser = await prisma.user.findUnique({
                where: whereClause,
                include: includeItems,
            });

            if (!validUser) return null;
        
            const {userRoles, ...userObject} = validUser;

            const newUserObj = {
                ...userObject,
                roles: userRoles.map(({role}) => role.name),
            }

            return newUserObj;

        } catch(error) {
            throw error;
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
            password_hash:false,
            google_id:false,
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
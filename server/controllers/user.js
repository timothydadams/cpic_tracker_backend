import { prisma } from "../configs/db.js";
import { createJWT, hashPassword } from "../utils/auth.js";
import { authorize } from "../middleware/authorize.js";
import * as userPolicies from "../policies/users.js";
import * as rolePolicies from "../policies/roles.js";
import { handleResponse} from '../utils/defaultResponse.js'
import { AppError } from "../errors/AppError.js";
import { InviteCodeService } from "../services/invites.js";
import { UserService } from "../services/user.js";
import { RoleService } from "../services/roles.js";


export const handleGetUser = async(req,res) => {
    const { id } = req.params;
    if (!id) {
        throw new AppError("must provide a user id", 400);
    }

    const includeItems = {
        email:true,
        id:true,
        family_name:true,
        given_name:true,
        display_name:true,
        profile_pic: true,
        implementer_org:true,
    }

    try {
        const user = await UserService.getUserById(id, res, includeItems);
    
        authorize(userPolicies.canRead, user)(req, res, async () => {
            const roles = await RoleService.getUserRoles(id);
            user.roles = roles.map(({role}) => role.name);
            handleResponse(res, 200, "user retrieved successfully", user);
        });

    } catch (error) {
        next(error)
    }
}

export const handleGetAllUsers = async(req,res) => {
    try {
        const users = await UserService.getAllUsers({includeRoles:true});
        handleResponse(res, 200, "users retrieved", users);
    } catch(e) {
        next(e)
    }
}


export const handleUpdateUser = async(req,res) => {
    const { id } = req.params;
    if (!id) return res.json({message:"must provide an id parameter"})
    const { id:requesterId, isAdmin } = res.locals;

    if (!requesterId || (
        isAdmin === false && id !== requesterId
    )) return res.sendStatus(403);
    
    const { 
        email,
        username, 
        profile:{ 
            firstName,
            lastName,
            bio,
        }} = req.body;

    console.log('updating user:',{id, email })

    try {
        const user = await prisma.user.update({
            where: {
                id,
            },
            include: {
                password:false,
                profile:true,
            },
            data: {
                email,
                username,
                profile: {
                    upsert: {
                        where: {
                            userId:id
                        },
                        update: {
                            firstName,
                            lastName,
                            bio,
                        },
                        create: {
                            firstName,
                            lastName,
                            bio,
                        }
                        
                    }
                }
            }
        });
        
        if (!user?.id || !user?.username) return res.status(500).json({message:'failed to create user'});

        res.json({ user });
        
    } catch(e) {
        console.log('error:', e);
        res.status(500).json({message:'failed to update user'});
    }
    
}

export const getUserRoles = async(req,res) => {
    const { id:userId } = req.params;
    authorize(userPolicies.canRead)(req, res, async() => {
        const userRoles = await prisma.userRole.findMany({
            where:{
                user_id: userId,
            },
            include:{
                role_id:false,
                user_id:false,
                role:true,
            }
        })
        handleResponse(res, 200, "user roles retrieved", userRoles);

    })
}

export const removeRoleFromUser = async(req, res) => {
    const { id:userId } = req.params
    const { roleId } = req.body

    if (!userId || !roleId) {
        throw new AppError("userId and roleId must be provided");
    }
    
    try {
        authorize(userPolicies.canUpdate)(req, res, async () => {
            const result = await RoleService.removeRoleFromUser(userId, roleId);
            handleResponse(res, 200, "role removed from user", result);
        });
    } catch(e) {
        next(e)
    }
     
}


export const addRoleToUser = async(req, res) => {
    const { id:userId } = req.params
    const { roleId } = req.body
    if (!userId || !roleId) {
        throw new AppError("userId and roleId must be provided");
    }
    
    authorize(userPolicies.canUpdate)(req, res, async () => {
        const result = await RoleService.addRoleToUser(userId,roleId);
        handleResponse(res, 200, "role added to user", result);
    });
    
}

export const registerNewUser = async (req, res, next) => {
    try {
        const { user, inviteCode, inviteDetails } = req.body;
        const { roleId } = inviteDetails;

        if (!user?.email) throw new AppError("Missing user data", 400)
        if (!roleId) throw new AppError("roleId must be provided", 400)

        const newUser = await UserService.register(user, {roleId, inviteCode});
        
        if (!newUser.id) {
            throw new AppError("failed to create user", 500);
        }

        await InviteCodeService.markAsUsed(inviteCode, newUser.id);

        handleResponse(res, 200, "user registeration success");

    } catch(e) {
        next(e)
    }
}
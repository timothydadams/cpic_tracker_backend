import { prisma } from "../configs/db.js";
import { createJWT, hashPassword } from "../utils/auth.js";
import { authorize } from "../middleware/authorize.js";
import * as userPolicies from "../policies/users.js";
import * as rolePolicies from "../policies/roles.js";
import { handleResponse} from '../utils/defaultResponse.js'
import { AppError } from "../errors/AppError.js";
import { UserService } from "../services/user.js";
import { RoleService } from "../services/roles.js";
import { parseBoolean } from "../utils/queryStringParsers.js";


export const handleGetUser = async(req,res,next) => {
    const { id } = req.params;
    if (!id) {
        throw new AppError("must provide a user id", 400);
    }
    const federated_idps = parseBoolean(req.query.federated_idps);
    const passkeys = parseBoolean(req.query.passkeys);

    const includeItems = {
        email:true,
        id:true,
        family_name:true,
        given_name:true,
        display_name:true,
        username:true,
        profile_pic: true,
        implementer_org:true,
        ...(federated_idps ? {federated_idps:true} : {}),
        ...(passkeys ? {passkeys:{include:{createdAt:true,transports:true,deviceType:true}}} : {}),
    }

    try {
        const user = await UserService.getUserById(id, includeItems);
    
        authorize(userPolicies.canRead, user)(req, res, async () => {
            const roles = await RoleService.getUserRoles(id);
            user.roles = roles.map(({role}) => role.name);
            handleResponse(res, 200, "user retrieved successfully", user);
        });

    } catch (error) {
        next(error)
    }
}

export const handleGetAllUsers = async(req,res,next) => {
    const { user } = res.locals;
    const { isGlobalAdmin, isCPICAdmin } = user;
    if (!isGlobalAdmin || isCPICAdmin) {
        throw new AppError("Forbidden", 403);
    }

    try {
        const users = await UserService.getAllUsers({includeRoles:true});
        handleResponse(res, 200, "users retrieved", users);
    } catch(e) {
        next(e)
    }
}


export const handleUpdateUser = async(req,res, next) => {
    const { id } = req.params;

    if (!id) {
        throw new AppError("must provide an id parameter", 400)
    }
    
    const {
        family_name,
        given_name,
        display_name,
        username,
    } = req.body;

    try {
        const userToUpdate = await UserService.getUserById(id);
    
        authorize(userPolicies.canUpdate, userToUpdate)(req, res, async () => {
            const user = await UserService.updateUser(id, {family_name,given_name,display_name,username});
            handleResponse(res, 200, "user updated successfully", user);
        });
    } catch(e) {
        next(e)
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

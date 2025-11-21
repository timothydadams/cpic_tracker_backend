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
    const implementer_org = parseBoolean(req.query.implementer_details);
    const assigned_implementers = parseBoolean(req.query.assigned_implementers);

    const options = {}
    options.select = {
        email:true,
        id:true,
        family_name:true,
        given_name:true,
        display_name:true,
        username:true,
        profile_pic: true,
        username:true,
        implementer_org: true,
        ...(federated_idps ? {federated_idps:true} : {}),
        ...(passkeys ? {passkeys:{select:{id:true,createdAt:true,transports:true,deviceType:true, user_agent:true}}} : {}),
        ...(implementer_org ? {implementer_org:true} : {}),
        ...(assigned_implementers ? {assigned_implementers:true} : {}),
    }

    try {
        const user = await UserService.getUserById(id, options);
    
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
        assigned_implementers,
        implementer_org_id,
    } = req.body;

    const options = {}

    try {
        const userToUpdate = await UserService.getUserById(id, options);
    
        authorize(userPolicies.canUpdate, userToUpdate)(req, res, async () => {
            let user;
            try {
                user = await UserService.updateUser(id, {
                    family_name,
                    given_name,
                    display_name,
                    username,
                    implementer_org_id: Number(implementer_org_id),
                });
                if (assigned_implementers) {
                    await UserService.updateAssignedImplementers(id, assigned_implementers);
                }
            } catch(e) {
                next(e)
            }

            handleResponse(res, 200, "user updated successfully", user);
        });
    } catch(e) {
        next(e)
    }
    
}

export const getUserRoles = async(req,res, next) => {
    const { id:userId } = req.params;
    authorize(userPolicies.canRead)(req, res, async() => {
        try {
            let userRoles = await RoleService.getUserRoles(userId);
            userRoles = userRoles.map(({ createdAt, role }) => ({
                ...role,
                createdAt,
            }));
            handleResponse(res, 200, "user roles retrieved", userRoles);
        } catch(e) {
            next(e)
        }
    })
}

export const removeRoleFromUser = async(req, res, next) => {
    const { id:userId } = req.params
    const { roleId } = req.body

    if (!userId || !roleId) {
        throw new AppError("userId and roleId must be provided");
    }
    
    try {
        authorize(userPolicies.canAddRemoveRoles)(req, res, async () => {
            const result = await RoleService.removeRoleFromUser(userId, roleId);
            handleResponse(res, 200, "role removed from user", result);
        });
    } catch(e) {
        next(e)
    }
     
}


export const addRoleToUser = async(req, res, next) => {
    const { id:userId } = req.params
    const { roleId } = req.body
    if (!userId || !roleId) {
        throw new AppError("userId and roleId must be provided");
    }

    try {
        authorize(userPolicies.canAddRemoveRoles)(req, res, async () => {
            const result = await RoleService.addRoleToUser(userId,roleId);
            handleResponse(res, 200, "role added to user", result);
        });
    }catch(e){
        next(e)
    }
}

    
export const deleteUserPasskey = async(req, res, next) => {
    const {id:userId} = req.params;
    const {pk_id} = req.body;
    if (!userId || !pk_id) {
        throw new AppError("userId and pk_id must be provided", 400);
    }

    try {
        const passkey = await prisma.passkey.findUnique({
            where: {id: pk_id}
        });
        authorize(userPolicies.canRemovePasskey, passkey)(req,res, async()=>{
            const count = UserService.deletePasskey(pk_id);
            handleResponse(res, 200, "passkey deleted", count);
        });
    } catch(e) {
        next(e)
    }
    
}

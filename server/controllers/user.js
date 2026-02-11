import { authorize } from "../middleware/authorize.js";
import * as userPolicies from "../resource_permissions/users.js";
import * as rolePolicies from "../resource_permissions/roles.js";
import { handleResponse} from '../utils/defaultResponse.js'
import { AppError } from "../errors/AppError.js";
import { UserService } from "../services/user.js";
import { RoleService } from "../services/roles.js";
import { parseBoolean } from "../utils/queryStringParsers.js";


export const handleGetUser = async(req,res) => {
    const { id } = req.params;
    if (!id) {
        throw new AppError("must provide a user id", 400);
    }
    const federated_idps = parseBoolean(req.query.federated_idps);
    const passkeys = parseBoolean(req.query.passkeys);
    const implementer_details = parseBoolean(req.query.implementer_details);
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
        //implementer_org: true,
        ...(federated_idps ? {federated_idps:true} : {}),
        ...(passkeys ? {passkeys:{select:{id:true,createdAt:true,transports:true,deviceType:true, user_agent:true}}} : {}),
        ...(implementer_details ? {implementer_org:true} : {}),
        ...(assigned_implementers ? {assigned_implementers:true} : {}),
    }

    const user = await UserService.getUserById(id, options);

    await authorize(userPolicies.canRead, user)(req, res, async () => {
        const roles = await RoleService.getUserRoles(id);
        user.roles = roles.map(({role}) => role.name);
        handleResponse(res, 200, "user retrieved successfully", user);
    });
}

export const handleGetAllUsers = async(req,res) => {
    const { user } = res.locals;
    const { isGlobalAdmin, isCPICAdmin } = user;
    if (!isGlobalAdmin && !isCPICAdmin) {
        throw new AppError("Forbidden", 403);
    }

    const users = await UserService.getAllUsers({includeRoles:true});
    handleResponse(res, 200, "users retrieved", users);
}

const generateUserProfileSelectOptions = ({
    federated_idps = false,
    passkeys = false,
    implementer_org = false,
    assigned_implementers = false,
}) => ({
    select : {
        email:true,
        id:true,
        family_name:true,
        given_name:true,
        display_name:true,
        username:true,
        profile_pic: true,
        username:true,
        ...(federated_idps ? {federated_idps:true} : {}),
        ...(passkeys ? {passkeys:{select:{id:true,createdAt:true,transports:true,deviceType:true, user_agent:true}}} : {}),
        ...(implementer_org ? {implementer_org:true} : {}),
        ...(assigned_implementers ? {assigned_implementers:true} : {}),
    }
})

export const handleUpdateUser = async(req,res) => {
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

    const options = {
        include: {
            implementer_org:true,
            assigned_implementers:true,
        }
    }

    const userToUpdate = await UserService.getUserById(id, options);

    await authorize(userPolicies.canUpdate, userToUpdate)(req, res, async () => {
        await UserService.updateUser(id, {
            ...(family_name ? {family_name} : {}),
            ...(given_name ? {given_name} : {}),
            ...(display_name ? {display_name} : {}),
            ...(username ? {username} : {}),
            ...(implementer_org_id ? {implementer_org_id:Number(implementer_org_id)} : {}),
        });

        if (assigned_implementers) {
            await UserService.updateAssignedImplementers(id, assigned_implementers);
        }

        const selectOptions = generateUserProfileSelectOptions({
            ...(userToUpdate.implementer_org_id ? {implementer_org:true} : {}),
            ...(userToUpdate.assigned_implementers.length > 0 ? {assigned_implementers:true} : {}),
        });

        const user = await UserService.getUserById(id, selectOptions);

        handleResponse(res, 200, "user updated successfully", user);
    });
}

export const getUserRoles = async(req,res) => {
    const { id:userId } = req.params;
    await authorize(userPolicies.canRead)(req, res, async() => {
        let userRoles = await RoleService.getUserRoles(userId);
        userRoles = userRoles.map(({ createdAt, role }) => ({
            ...role,
            createdAt,
        }));
        handleResponse(res, 200, "user roles retrieved", userRoles);
    })
}

export const removeRoleFromUser = async(req, res) => {
    const { id:userId } = req.params
    const { roleId } = req.body

    if (!userId || !roleId) {
        throw new AppError("userId and roleId must be provided");
    }

    await authorize(userPolicies.canAddRemoveRoles)(req, res, async () => {
        const result = await RoleService.removeRoleFromUser(userId, roleId);
        handleResponse(res, 200, "role removed from user", result);
    });
}


export const addRoleToUser = async(req, res) => {
    const { id:userId } = req.params
    const { roleId } = req.body
    if (!userId || !roleId) {
        throw new AppError("userId and roleId must be provided");
    }

    await authorize(userPolicies.canAddRemoveRoles)(req, res, async () => {
        const result = await RoleService.addRoleToUser(userId,roleId);
        handleResponse(res, 200, "role added to user", result);
    });
}


export const deleteUserPasskey = async(req, res) => {
    const {id:userId} = req.params;
    const {pk_id} = req.body;
    if (!userId || !pk_id) {
        throw new AppError("userId and pk_id must be provided", 400);
    }

    const passkey = await UserService.getPasskeyById(pk_id);
    await authorize(userPolicies.canRemovePasskey, passkey)(req,res, async()=>{
        const count = await UserService.deletePasskey(pk_id);
        handleResponse(res, 200, "passkey deleted", count);
    });
}

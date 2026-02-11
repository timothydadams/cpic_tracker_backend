import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../resource_permissions/roles.js";
import { parseId } from "../utils/queryStringParsers.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { pick } from "../utils/sanitize.js";
import { RoleService } from "../services/roles.js";

const ROLE_FIELDS = ['name', 'description'];

export const viewRole = async (req, res) => {
    const roleId = parseId(req.params.id);
    const role = await RoleService.getById(roleId);
    await authorize(canRead, role)(req, res, () => {
        handleResponse(res, 200, "role retrieved successfully", role);
    });
}

export const viewAllRoles = async(req,res) => {
    await authorize(canRead)(req, res, async () => {
        const roles = await RoleService.getAll();
        handleResponse(res, 200, "roles retrieved successfully", roles);
    });
}

export const createRole = async(req, res) =>{
    const data = pick(req.body, ROLE_FIELDS);
    await authorize(canCreate)(req, res, async () => {
        const newRole = await RoleService.create(data);
        handleResponse(res, 200, "role created successfully", newRole);
    });
}

export const updateRole = async (req, res) => {
    const roleId = parseId(req.params.id);
    const data = pick(req.body, ROLE_FIELDS);

    const role = await RoleService.getById(roleId);

    await authorize(canUpdate, role)(req, res, async () => {
        const updatedRole = await RoleService.update(roleId, data);
        handleResponse(res, 200, "role updated successfully", updatedRole);
    });
}

export const deleteRole = async (req, res) => {
    const roleId = parseId(req.params.id);

    const role = await RoleService.getById(roleId);

    await authorize(canDelete, role)(req, res, async () => {
        const result = await RoleService.delete(roleId);
        handleResponse(res, 200, "role successfully deleted", result);
    });
}

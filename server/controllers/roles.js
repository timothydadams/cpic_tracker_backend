import { prisma } from "../configs/db.js";
import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../policies/roles.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const getRoleById = async (id, res) => {
    const role = await prisma.role.findUnique({
        where:{
            id
        }
    });

    if (!role) {
        handleResponse(res, 404, "role not found");
    } else {
        return role
    }
}

export const viewRole = async (req, res) => {
    const roleId = parseInt(req.params.id);
    const role = await getRoleById(roleId, res);
    authorize(canRead, role)(req, res, () => {
        handleResponse(res, 200, "role retrieved successfully", role);
    });
}

export const viewAllRoles = async(req,res) => {
    const role = {}
    const roles = await prisma.role.findMany();
    //handleResponse(res, 200, "roles retrieved successfully", roles);

    
    authorize(canRead, role)(req, res, async () => {
        const roles = await prisma.role.findMany();
        handleResponse(res, 200, "strategy retrieved successfully", roles);
    });
}

export const createRole = async(req, res) =>{
    const data = req.body;
    authorize(canCreate)(req, res, async () => {
        const newRole = await prisma.role.create({
            data
        });
        handleResponse(res, 200, "role created successfully", newRole);
    });
}

export const updateRole = async (req, res) => {
    const roleId = parseInt(req.params.id);
    const data = req.body;

    const role = await getRoleById(roleId, res);

    authorize(canUpdate, role)(req, res, async () => {
        const updatedRole = await prisma.role.update({
            where:{
                id
            },
            data,
        });
        handleResponse(res, 200, "role updated successfully", updatedRole);
    });
}

export const deleteRole = async (req, res) => {
    const roleId = parseInt(req.params.id);

    const role = await getRoleById(roleId, res);

    authorize(canDelete, role)(req, res, async () => {
        const result = await prisma.role.delete({
            where:{
                id
            },
        });
        handleResponse(res, 200, "role successfully deleted", result);
    });
}



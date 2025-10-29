import { prisma } from "../configs/db.js";
import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../policies/focusAreas.js";
import { parseBoolean } from "../utils/queryStringParsers.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const getFocusAreaById = async (id, res, includedItems = null) => {
    const fa = await prisma.focusArea.findUnique({
        where:{
            id
        },
        ...(includedItems != null && {include:includedItems}),
    });

    if (!fa) {
        handleResponse(res, 404, "focus area not found");
    } else {
        return fa
    }
}

export const viewFocusArea = async (req, res) => {
    const id = parseInt(req.params.id,10);
    const policies = parseBoolean(req.query.policies);

    const includeItems = {
        ...(policies ? { policies: true} : {}),
    }

    const focus_area = await getFocusAreaById(id, res, includeItems);
    authorize(canRead, focus_area)(req, res, () => {
        handleResponse(res, 200, "focus area retrieved successfully", focus_area);
    });
}

export const viewAllFocusAreas = async(req,res) => {
    const policies = parseBoolean(req.query.policies);

    const includeItems = {
        ...(policies ? { policies: {
            orderBy: {
                policy_number:"asc"
            }
        }} : {}),
    }

    try {
        const fas = await prisma.focusArea.findMany({
            include:includeItems
        });
        handleResponse(res, 200, "focus areas retrieved successfully", fas);
    } catch(e) {
        handleResponse(res, 500, "failed to retrieve focus areas");
    }
    /*
    authorize(canRead, strategy)(req, res, async () => {
        const strategies = await prisma.strategy.findMany();
        handleResponse(res, 200, "strategy retrieved successfully", strategies);
    });
    */
}



export const createFocusArea = async(req, res) =>{
    const data = req.body;
    authorize(canCreate)(req, res, async () => {
        const newFA = await prisma.focusArea.create({
            data
        });
        handleResponse(res, 200, "focus area created successfully", newFA);
    });
}

export const updateFocusArea = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const fa = await getFocusAreaById(id, res);
    authorize(canUpdate, fa)(req, res, async () => {
        const updatedFA = await prisma.focusArea.update({
            where:{
                id
            },
            data,
        });
        handleResponse(res, 200, "focus area updated successfully", updatedFA);
    });
}

export const deleteFocusArea = async (req, res) => {
    const id = parseInt(req.params.id);
    const fa = await getFocusAreaById(id, res);
    authorize(canDelete, fa)(req, res, async () => {
        const result = await prisma.focusArea.delete({
            where:{
                id
            },
        });
        handleResponse(res, 200, "focus area successfully deleted", result);
    });
}
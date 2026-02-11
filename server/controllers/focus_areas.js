import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../resource_permissions/focusAreas.js";
import { parseBoolean, parseId } from "../utils/queryStringParsers.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { pick } from "../utils/sanitize.js";
import { FocusAreaService } from "../services/focus_areas.js";

const FOCUS_AREA_FIELDS = ['name', 'description', 'state_goal'];

export const viewFocusArea = async (req, res) => {
    const id = parseId(req.params.id);
    const policies = parseBoolean(req.query.policies);

    const includeItems = {
        ...(policies ? {
                policies: {
                    orderBy: {
                        policy_number: 'asc',
                    }
                }
        } : {}),
    }

    const focus_area = await FocusAreaService.getById(id, includeItems);
    await authorize(canRead, focus_area)(req, res, () => {
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

    const fas = await FocusAreaService.getAll(includeItems);
    handleResponse(res, 200, "focus areas retrieved successfully", fas);
}



export const createFocusArea = async(req, res) =>{
    const data = pick(req.body, FOCUS_AREA_FIELDS);
    await authorize(canCreate)(req, res, async () => {
        const newFA = await FocusAreaService.create(data);
        handleResponse(res, 200, "focus area created successfully", newFA);
    });
}

export const updateFocusArea = async (req, res) => {
    const id = parseId(req.params.id);
    const data = pick(req.body, FOCUS_AREA_FIELDS);
    const fa = await FocusAreaService.getById(id);
    await authorize(canUpdate, fa)(req, res, async () => {
        const updatedFA = await FocusAreaService.update(id, data);
        handleResponse(res, 200, "focus area updated successfully", updatedFA);
    });
}

export const deleteFocusArea = async (req, res) => {
    const id = parseId(req.params.id);
    const fa = await FocusAreaService.getById(id);
    await authorize(canDelete, fa)(req, res, async () => {
        const result = await FocusAreaService.delete(id);
        handleResponse(res, 200, "focus area successfully deleted", result);
    });
}

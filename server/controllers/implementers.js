import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../resource_permissions/focusAreas.js";
import { parseBoolean, parseId } from "../utils/queryStringParsers.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { pick } from "../utils/sanitize.js";
import { ImplementerService } from "../services/implementers.js";

const IMPLEMENTER_FIELDS = ['name', 'emails', 'phone_numbers', 'is_board', 'is_department', 'is_school'];

export const viewImplementer = async (req, res) => {
    const id = parseId(req.params.id);

    const cpic_smes = parseBoolean(req.query.cpic_smes);
    const strategies = parseBoolean(req.query.strategies);

    const includeItems = {
        ...(cpic_smes ? { cpic_smes: true} : {}),
        ...(strategies ? { strategies: true} : {}),
    }

    const imp = await ImplementerService.getById(id, includeItems);
    await authorize(canRead, imp)(req, res, () => {
        handleResponse(res, 200, "implementer retrieved successfully", imp);
    });
}

export const viewAllImplementers = async(req,res) => {
    const cpic_smes = parseBoolean(req.query.cpic_smes);
    const strategies = parseBoolean(req.query.strategies);

    const includeItems = {
        ...(cpic_smes ? { cpic_smes: true} : {}),
        ...(strategies ? { strategies: true} : {}),
    }

    const imps = await ImplementerService.getAll(includeItems);
    handleResponse(res, 200, "implementers retrieved successfully", imps);
}



export const createImplementer = async(req, res) =>{
    const data = pick(req.body, IMPLEMENTER_FIELDS);
    await authorize(canCreate)(req, res, async () => {
        const newImp = await ImplementerService.create(data);
        handleResponse(res, 200, "implementer created successfully", newImp);
    });
}

export const updateImplementer = async (req, res) => {
    const id = parseId(req.params.id);
    const data = pick(req.body, IMPLEMENTER_FIELDS);
    const imp = await ImplementerService.getById(id);
    await authorize(canUpdate, imp)(req, res, async () => {
        const updatedImp = await ImplementerService.update(id, data);
        handleResponse(res, 200, "implementer updated successfully", updatedImp);
    });
}

export const deleteImplementer = async (req, res) => {
    const id = parseId(req.params.id);
    const imp = await ImplementerService.getById(id);
    await authorize(canDelete, imp)(req, res, async () => {
        const result = await ImplementerService.delete(id);
        handleResponse(res, 200, "implementer successfully deleted", result);
    });
}

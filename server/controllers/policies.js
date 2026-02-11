import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../resource_permissions/policies.js";
import { parseBoolean, parseId } from "../utils/queryStringParsers.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { pick } from "../utils/sanitize.js";
import { PolicyService } from "../services/policies.js";

const POLICY_FIELDS = ['description', 'policy_number', 'focus_area_id'];

export const viewPolicy = async (req, res) => {
    const policyId = parseId(req.params.id);
    const policy = await PolicyService.getById(policyId);
    await authorize(canRead, policy)(req, res, () => {
        handleResponse(res, 200, "policy retrieved successfully", policy);
    });
}

export const viewAllPolicies = async(req,res) => {
    const area = parseBoolean(req.query.area);
    const strategies = parseBoolean(req.query.strategies);

    const includeItems = {
        ...(area ? { area: true} : {}),
        ...(strategies ? {strategies:true} : {}),
    }

    const policies = await PolicyService.getAll(includeItems);
    handleResponse(res, 200, "policies retrieved successfully", policies);
}



export const createPolicy = async(req, res) =>{
    const data = pick(req.body, POLICY_FIELDS);
    await authorize(canCreate)(req, res, async () => {
        const newPolicy = await PolicyService.create(data);
        handleResponse(res, 200, "policy created successfully", newPolicy);
    });
}

export const updatePolicy = async (req, res) => {
    const policyId = parseId(req.params.id);
    const data = pick(req.body, POLICY_FIELDS);
    const policy = await PolicyService.getById(policyId);
    await authorize(canUpdate, policy)(req, res, async () => {
        const updatedPolicy = await PolicyService.update(policyId, data);
        handleResponse(res, 200, "policy updated successfully", updatedPolicy);
    });
}

export const deletePolicy = async (req, res) => {
    const policyId = parseId(req.params.id);
    const policy = await PolicyService.getById(policyId);
    await authorize(canDelete, policy)(req, res, async () => {
        const result = await PolicyService.delete(policyId);
        handleResponse(res, 200, "policy successfully deleted", result);
    });
}

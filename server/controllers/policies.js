import { prisma } from "../configs/db.js";
import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../policies/policies.js";
import { parseBoolean } from "../utils/queryStringParsers.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const getPolicyById = async (id, res) => {
    const policy = await prisma.policies.findUnique({
        where:{
            id
        },
        include: {
            area:true,
            strategies:true,
        }
    });

    if (!policy) {
        handleResponse(res, 404, "policy not found");
    } else {
        return policy
    }
}

export const viewPolicy = async (req, res) => {
    const policyId = parseInt(req.params.id,10);
    const policy = await getPolicyById(policyId, res);
    authorize(canRead, policy)(req, res, () => {
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

    try {
        const policies = await prisma.policies.findMany({
            include:includeItems
        });
        handleResponse(res, 200, "policies retrieved successfully", policies);
    } catch(e) {
        handleResponse(res, 500, "failed to retrieve policies");
    }
    /*
    authorize(canRead, strategy)(req, res, async () => {
        const strategies = await prisma.strategy.findMany();
        handleResponse(res, 200, "strategy retrieved successfully", strategies);
    });
    */
}



export const createPolicy = async(req, res) =>{
    const data = req.body;
    authorize(canCreate)(req, res, async () => {
        const newPolicy = await prisma.policies.create({
            data
        });
        handleResponse(res, 200, "policy created successfully", newPolicy);
    });
}

export const updatePolicy = async (req, res) => {
    const policyId = parseInt(req.params.id);
    const data = req.body;
    const policy = await getPolicyById(policyId, res);
    authorize(canUpdate, policy)(req, res, async () => {
        const updatedPolicy = await prisma.policies.update({
            where:{
                id
            },
            data,
        });
        handleResponse(res, 200, "policy updated successfully", updatedPolicy);
    });
}

export const deletePolicy = async (req, res) => {
    const policyId = parseInt(req.params.id);
    const policy = await getPolicyById(policyId, res);
    authorize(canDelete, policy)(req, res, async () => {
        const result = await prisma.policies.delete({
            where:{
                id
            },
        });
        handleResponse(res, 200, "policy successfully deleted", result);
    });
}
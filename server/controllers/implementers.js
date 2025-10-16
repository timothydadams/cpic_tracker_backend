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

const getImplementerById = async (id, res, includedItems = null) => {
    const imp = await prisma.implementer.findUnique({
        where:{
            id
        },
        ...(includedItems != null && {include:includedItems}),
    });

    if (!imp) {
        handleResponse(res, 404, "implementer not found");
    } else {
        return imp
    }
}

export const viewImplementer = async (req, res) => {
    const id = parseInt(req.params.id,10);

    const cpic_smes = parseBoolean(req.query.cpic_smes);
    const strategies = parseBoolean(req.query.strategies);

    const includeItems = {
        ...(cpic_smes ? { cpic_smes: true} : {}),
        ...(strategies ? { strategies: true} : {}),
    }

    const imp = await getImplementerById(id, res, includeItems);
    authorize(canRead, imp)(req, res, () => {
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

    try {
        const imps = await prisma.implementer.findMany({
            include:includeItems
        });
        handleResponse(res, 200, "implementers retrieved successfully", imps);
    } catch(e) {
        handleResponse(res, 500, "failed to retrieve implementers");
    }
    
    /*
    authorize(canRead, strategy)(req, res, async () => {
        const strategies = await prisma.strategy.findMany();
        handleResponse(res, 200, "strategy retrieved successfully", strategies);
    });
    */
}



export const createImplementer = async(req, res) =>{
    const data = req.body;
    authorize(canCreate)(req, res, async () => {
        const newImp = await prisma.implementer.create({
            data
        });
        handleResponse(res, 200, "implementer created successfully", newImp);
    });
}

export const updateImplementer = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const imp = await getImplementerById(id, res);
    authorize(canUpdate, imp)(req, res, async () => {
        const updatedImp = await prisma.implementer.update({
            where:{
                id
            },
            data,
        });
        handleResponse(res, 200, "implementer updated successfully", updatedImp);
    });
}

export const deleteImplementer = async (req, res) => {
    const id = parseInt(req.params.id);
    const imp = await getImplementerById(id, res);
    authorize(canDelete, imp)(req, res, async () => {
        const result = await prisma.implementer.delete({
            where:{
                id
            },
        });
        handleResponse(res, 200, "implementer successfully deleted", result);
    });
}
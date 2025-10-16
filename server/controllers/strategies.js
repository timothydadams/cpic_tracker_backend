import { prisma } from "../configs/db.js";
import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../policies/strategies.js";
import { parseBoolean } from "../utils/queryStringParsers.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const deleteSpecificImplementersFromStrategy = async (implementerIds, strategyId) => {
    try {
        const deleteCount = await prisma.strategyImplementer.deleteMany({
            where: {
                strategy_id: strategyId,
                implementer_id: {
                    in: implementerIds //array of implementer ids
                },
            }
        });
        return deleteCount;
    }catch(e) {
        console.log('error removing implementers');
        return {"message": "error removing implementers"}
    }

}

const addImplementersToStrategy = async (implementerIds, strategyId) => {

    const data = implementerIds.map(id => ({
        implementer_id: id,
        strategy_id: strategyId,
    }));

    try {
        const result = await prisma.strategyImplementer.createMany({
            data
        });
        return result;
    } catch(e) {
        console.log('error adding implementers', e);
        return {"message": "error adding implementers"}
    }

}

const getStrategyById = async (id, res, includes = null) => {
    const strategy = await prisma.strategy.findUnique({
        where:{
            id
        },
        ...(includes != null && {include:includes}),
    });

    if (!strategy) {
        handleResponse(res, 404, "strategy not found");
    } else {
        return strategy
    }
}

export const viewStrategy = async (req, res) => {
    const strategyId = parseInt(req.params.id,10);

    const implementers = parseBoolean(req.query.implementers);
    const timeline = parseBoolean(req.query.timeline);
    //const comments = parseBoolean(req.query.comments);
    const policy = parseBoolean(req.query.policy);
    const status = parseBoolean(req.query.status);
    
    const includeItems = {
            ...(implementers ? { 
                implementers: {
                    include:{
                        implementer:true
                    },
                    orderBy: {
                        order_number: 'asc', // Sort the included posts by 'createdAt' in descending order
                    },

                }
            } : {}),
            ...(timeline ? {timeline:true} : {}),
            //...(comments ? {comments:true} : {}),
            ...(policy ? {policy:{include:{area:true}}} : {}),
            ...(status ? {status:true} : {}),
    }

    const strategy = await getStrategyById(strategyId, res, includeItems);

    authorize(canRead, strategy)(req, res, () => {
        handleResponse(res, 200, "strategy retrieved successfully", strategy);
    });
}

export const viewAllStrategies = async(req,res) => {

    const strategies = await prisma.strategy.findMany({
        include:{
            implementers:{
                include: {
                    implementer:{
                        include: {
                            cpic_smes:true
                        }
                    }
                }
            },
            timeline:true,
            policy:{
                include:{
                    area:true,
                }
            },
            status:true,
        }
    });
    handleResponse(res, 200, "strategy retrieved successfully", strategies);

    /*
    authorize(canRead, strategy)(req, res, async () => {
        const strategies = await prisma.strategy.findMany();
        handleResponse(res, 200, "strategy retrieved successfully", strategies);
    });
    */
}

export const viewStrategyStatuses = async(req,res) => {
    try {
        const statuses = await prisma.statusOptions.findMany();
        handleResponse(res, 200, "strategy statuses retrieved successfully", statuses);
    } catch(e) {
        console.log("prisma error",e);
    }  
}

export const viewStrategyComments = async(req,res) => {
    const id = parseInt(req.params.id);
    const children = parseBoolean(req.query.replies);
    
    const includeItems = {
        ...(children ? { children:{ include: {children: true}}} : {}),
    }

    try {
        const comments = await prisma.comment.findMany({
            where: {
                strategy_id: id,
            },
            include:includeItems,
        });
        
        handleResponse(res, 200, "strategy comments retrieved successfully", comments);
    } catch(e) {
        console.log("prisma error",e);
        handleResponse(res, 500, "error retrieving strategy comments");
    }  
}

export const viewTimelineOptions = async(req, res) => {
    try {
        const timelineOpts = await prisma.timelineOptions.findMany();
        handleResponse(res, 200, "strategy timeline options retrieved successfully", timelineOpts);
    } catch(e) {
        console.log("prisma error",e);
    } 
}

export const viewPolicies = async(req, res) => {
    try {
        const policies = await prisma.policies.findMany();
        handleResponse(res, 200, "strategy policies retrieved successfully", policies);
    } catch(e) {
        console.log("prisma error",e);
    } 
}

export const viewFocusAreas = async(req, res) => {
    try {
        const areas = await prisma.focusArea.findMany();
        handleResponse(res, 200, "strategy focus areas retrieved successfully", areas);
    } catch(e) {
        console.log("prisma error",e);
    }
}

export const createStrategy = async(req, res) =>{
    const data = req.body;
    authorize(canCreate)(req, res, async () => {
        const newStrategy = await prisma.strategy.create({
            data
        });
        handleResponse(res, 200, "strategy updated successfully", newStrategy);
    });
}

export const updateStrategy = async (req, res) => {
    const strategyId = parseInt(req.params.id);
    const {implementers, ...rest} = req.body;

    const strategy = await getStrategyById(strategyId, res);

    //convert any numeric string fields back to numbers for db (typically foreign key references for integer id)
    for (const key in strategy) {
        if (typeof strategy[key] == "number" && rest[key] !== undefined) {
            rest[key] = Number(rest[key]);
        }
    }

    console.log("attempting to update:", {
        strategyId,
        strategy,
        implementers,
        "body": rest,
    });

    authorize(canUpdate, strategy)(req, res, async () => {
        
        //add implementers if changed
        const { add=[], remove=[] } = implementers;
        
        if (add.length > 0) {
            const addResult = await addImplementersToStrategy(add, strategyId);
        }

        //remove implementers if changed
        if (remove.length > 0) {
            const deleteCount = await deleteSpecificImplementersFromStrategy(remove, strategyId);
        }

        const updatedStrategy = await prisma.strategy.update({
            where:{
                id: strategyId
            },
            data: {
                ...rest,
                updatedAt: new Date(),
            }
        });
        
        handleResponse(res, 200, "strategy updated successfully", updatedStrategy);
    });

}

export const deleteStrategy = async (req, res) => {
    const strategyId = parseInt(req.params.id);

    const strategy = await getStrategyById(strategyId, res);

    authorize(canDelete, strategy)(req, res, async () => {
        const result = await prisma.strategy.delete({
            where:{
                id
            },
        });
        handleResponse(res, 200, "strategy successfully deleted", result);
    });
}
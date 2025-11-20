import { prisma } from "../configs/db.js";
import { authorize } from "../middleware/authorize.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { StrategyService } from "../services/strategies.js";
import { canCreate, canRead, canUpdate, canDelete } from "../policies/strategies.js";
import { parseBoolean, buildNestedIncludeObject } from "../utils/queryStringParsers.js";
import { AppError } from "../errors/AppError.js";
import { UserService } from "../services/user.js";
import { ImplementerService } from "../services/implementers.js";


export const viewMyStrategies = async (req, res, next) => {
    const userId = res.locals.user.id;
    const isImplementer = res.locals.user.isImplementer;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    let user;
    try {
        const options = {}
        options.select = isImplementer ? { implementer_org:true } : {assigned_implementers: true }
        user = await UserService.getUserById(userId, options);
    } catch(e) {
        next(e)
    }

    const {implementer_org = null, assigned_implementers = null} = user;

    let results;
    if (implementer_org) {
        results = {}
        results.implementer = {...implementer_org}
        try {
            results.strategies = await ImplementerService.getImplementerStrategies(implementer_org.id);
        } catch(e) {
            next(e)
        }
    } else {
        results = []
        for (const imp of assigned_implementers) {
            console.log('implementer assigned')
            const details = imp;
            const strategies = await ImplementerService.getImplementerStrategies(imp.id);
            results.push({details,strategies});
        }
    }

    handleResponse(res, 200, "strategies retrieved", results);
}



export const viewStrategy = async (req, res, next) => {
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

    try {
        const strategy = await StrategyService.getStrategyById(strategyId, includeItems);
        authorize(canRead, strategy)(req, res, () => {
            handleResponse(res, 200, "strategy retrieved successfully", strategy);
        });
    } catch(e) {
        next(e)
    }

}

export const viewAllStrategies = async(req,res,next) => {
    const { policy, focus_area, include } = req.query;

    const where ={};

    if (policy) {
        where.policy_id = policy;
    }
    if (focus_area) {
        where.focus_area_id = focus_area;
    }

    let prismaInclude = {};
    if (include) {
        const relations = include.split(",");
        const parsedInclude = {}
        for (const item of relations) {
            const pathParts = item.split(".");
            Object.assign(parsedInclude, buildNestedIncludeObject(pathParts))
        }
        prismaInclude = parsedInclude
    }

    //console.log('prisma include built:', JSON.stringify(prismaInclude, null, '\t'));

    const strategies = await prisma.strategy.findMany({
        where,
        include: prismaInclude,
    });
    
    handleResponse(res, 200, "strategies retrieved successfully", strategies);

    /*
    authorize(canRead, strategy)(req, res, async () => {
        const strategies = await prisma.strategy.findMany();
        handleResponse(res, 200, "strategy retrieved successfully", strategies);
    });
    */
}

export const viewStrategyStatuses = async(req,res) => {
    try {
        const statuses = await prisma.statusOptions.findMany({
            where: {
                enabled:true
            }
        });
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
        const timelineOpts = await prisma.timelineOptions.findMany({
            where: {
                enabled:true
            }
        });
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

export const handleUpdateStrategy = async (req, res, next) => {
    const strategyId = parseInt(req.params.id);

    let strategy;
    try {
        strategy = await StrategyService.getStrategyById(id);
    } catch(e) {
        next(e);
    }

    authorize(canUpdate, strategy)(req, res, async () => {
        const {implementers = {}, primary_implementer = null, ...rest} = req.body;

        //convert any numeric string fields in req.body back to numbers for db 
        // (typically foreign key references for integer id)
        for (const key in strategy) {
            if (typeof strategy[key] == "number" && rest[key] !== undefined) {
                rest[key] = Number(rest[key]);
            }
        }
        
        //add implementers if changed
        const { add=[], remove=[] } = implementers;
        
        if (add.length > 0) {
            try {
                await StrategyService.addImplementersToStrategy(add, strategyId);
            } catch(e) {
                next(e)
            }
        }

        //remove implementers if changed
        if (remove.length > 0) {
            try {
                await StrategyService.deleteImplementersFromStrategy(remove, strategyId)
            } catch(e) {
                next(e)
            }
        }

        if (primary_implementer) {
            try {
                console.log('attempting to update primary', {strategyId, primary_implementer});
                await StrategyService.updatePrimaryImplementer(strategyId, primary_implementer)
            } catch(e) {
                next(e)
            }
        }

        try {
            const updatedStrategy = await StrategyService.updateStrategyDetails(strategyId, {
                ...rest,
                updatedAt: new Date(),
            });
            handleResponse(res, 200, "strategy updated successfully", updatedStrategy);
        } catch(e) {
            next(e)
        }
    
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
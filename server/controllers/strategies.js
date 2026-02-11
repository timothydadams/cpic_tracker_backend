import { prisma } from "../configs/db.js";
import { authorize } from "../middleware/authorize.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { StrategyService } from "../services/strategies.js";
import { canCreate, canRead, canUpdate, canDelete } from "../resource_permissions/strategies.js";
import { parseBoolean, buildNestedIncludeObject } from "../utils/queryStringParsers.js";
import { AppError } from "../errors/AppError.js";
import { UserService } from "../services/user.js";
import { ImplementerService } from "../services/implementers.js";
import { StrategyActivityService } from "../services/strategyActivity.js";
import { pick } from "../utils/sanitize.js";
import { applyChanges } from "../utils/buildActivityChanges.js"

const STRATEGY_FIELDS = ['content', 'policy_id', 'strategy_number', 'timeline_id', 'status_id', 'focus_area_id', 'last_comms_date'];

const VALID_STRATEGY_INCLUDES = new Set([
    'focus_area', 'stakeholders', 'comments', 'timeline',
    'status', 'policy', 'implementers', 'activities',
]);
const MAX_INCLUDE_DEPTH = 2;
import { buildActivityChanges } from "../utils/buildActivityChanges.js";

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
        return next(e)
    }

    const {implementer_org = null, assigned_implementers = null} = user;

    let results;
    if (implementer_org) {
        results = {}
        results.implementer = {...implementer_org}
        try {
            results.strategies = await ImplementerService.getImplementerStrategies(implementer_org.id);
        } catch(e) {
            return next(e)
        }
    } else {
        results = []
        for (const imp of assigned_implementers) {
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
        await authorize(canRead, strategy)(req, res, () => {
            handleResponse(res, 200, "strategy retrieved successfully", strategy);
        });
    } catch(e) {
        return next(e)
    }

}

export const viewAllStrategies = async(req,res,next) => {
    const { policy, focus_area, include, orderBy = null } = req.query;

    const where = {};

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
            if (!VALID_STRATEGY_INCLUDES.has(pathParts[0])) {
                return handleResponse(res, 400, `Invalid include relation: '${pathParts[0]}'`);
            }
            Object.assign(parsedInclude, buildNestedIncludeObject(pathParts, MAX_INCLUDE_DEPTH))
        }
        prismaInclude = parsedInclude
    }

    let parsedOrderBy;
    if (orderBy) {
        try {
            parsedOrderBy = JSON.parse(orderBy);
        } catch {
            return handleResponse(res, 400, "Invalid orderBy parameter: must be valid JSON");
        }
        if (parsedOrderBy === null || typeof parsedOrderBy !== 'object' || Array.isArray(parsedOrderBy)) {
            return handleResponse(res, 400, "Invalid orderBy parameter: must be a JSON object");
        }
    }

    const strategies = await prisma.strategy.findMany({
        where,
        include: prismaInclude,
        ...(parsedOrderBy ? { orderBy: parsedOrderBy } : {}),
    });
    
    handleResponse(res, 200, "strategies retrieved successfully", strategies);

    /*
    authorize(canRead, strategy)(req, res, async () => {
        const strategies = await prisma.strategy.findMany();
        handleResponse(res, 200, "strategy retrieved successfully", strategies);
    });
    */
}

export const viewStrategyStatuses = async(req, res, next) => {
    try {
        const statuses = await prisma.statusOptions.findMany({
            where: {
                enabled:true
            }
        });
        handleResponse(res, 200, "strategy statuses retrieved successfully", statuses);
    } catch(e) {
        return next(e);
    }
}

export const viewStrategyComments = async(req, res, next) => {
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
        return next(e);
    }
}

export const viewTimelineOptions = async(req, res, next) => {
    try {
        const timelineOpts = await prisma.timelineOptions.findMany({
            where: {
                enabled:true
            }
        });
        handleResponse(res, 200, "strategy timeline options retrieved successfully", timelineOpts);
    } catch(e) {
        return next(e);
    }
}

export const viewPolicies = async(req, res, next) => {
    try {
        const policies = await prisma.policies.findMany();
        handleResponse(res, 200, "strategy policies retrieved successfully", policies);
    } catch(e) {
        return next(e);
    }
}

export const viewFocusAreas = async(req, res, next) => {
    try {
        const areas = await prisma.focusArea.findMany();
        handleResponse(res, 200, "strategy focus areas retrieved successfully", areas);
    } catch(e) {
        return next(e);
    }
}

export const createStrategy = async(req, res) =>{
    const data = pick(req.body, STRATEGY_FIELDS);
    await authorize(canCreate)(req, res, async () => {
        const newStrategy = await prisma.strategy.create({
            data
        });

        const changes = {};
        for (const key of Object.keys(data)) {
            changes[key] = { old: null, new: data[key] };
        }
        await StrategyActivityService.create({
            strategy_id: newStrategy.id,
            user_id: res.locals.user.id,
            action: "CREATE",
            summary: "Created strategy",
            changes,
        });

        handleResponse(res, 200, "strategy created successfully", newStrategy);
    });
}

export const handleUpdateStrategy = async (req, res, next) => {
    const strategyId = parseInt(req.params.id);

    const include = {
        implementers:true
    }

    let strategy;
    try {
        strategy = await StrategyService.getStrategyById(strategyId, include);
    } catch(e) {
        return next(e);
    }

    const existingImps = strategy.implementers.map(x => x.implementer_id);
    const currentPrimaryImp = strategy.implementers.find(x => x.is_primary === true) ?? null;
    
    //need to get names for easy activity tracking
    const existingImpNames = await Promise.all(
        existingImps.map(async (imp) => {
            const { name } = await ImplementerService.getImplementerName(imp);
            return name;
    }));

    await authorize(canUpdate, strategy)(req, res, async () => {
        const {implementers = {}, primary_implementer = null} = req.body;
        const rest = pick(req.body, STRATEGY_FIELDS);

        //convert any numeric string fields in req.body back to numbers for db 
        // (typically foreign key references for integer id)
        for (const key in strategy) {
            if (typeof strategy[key] == "number" && rest[key] !== undefined) {
                rest[key] = Number(rest[key]);
            }
        }
        
        //add implementers if changed
        const { add=[], remove=[] } = implementers;
        const userId = res.locals.user.id;

        let summaryText = [];

        if (add.length > 0) {
            try {
                await StrategyService.addImplementersToStrategy(add, strategyId);
                const addedImpNames = await Promise.all(
                    add.map(async (imp) => {
                        const { name } = await ImplementerService.getImplementerName(imp);
                        return name;
                }));
                summaryText.push(`Added implementer(s): ${addedImpNames.join(", ")}`);
            } catch(e) {
                return next(e)
            }
        }

        //remove implementers if changed
        if (remove.length > 0) {
            try {
                await StrategyService.deleteImplementersFromStrategy(remove, strategyId);
                const removeImpNames = await Promise.all(
                    remove.map(async (imp) => {
                        const { name } = await ImplementerService.getImplementerName(imp);
                        return name;
                }));
                summaryText.push(`Removed implementer(s): ${removeImpNames.join(", ")}`);
            } catch(e) {
                return next(e)
            }
        }

        let actionText = (add.length > 0 && remove.length === 0) 
            ? "ADD_IMPLEMENTERS"
            : (add.length === 0 && remove.length > 0)
                ? "REMOVE_IMPLEMENTERS"
                : "UPDATE_IMPLEMENTERS";

        const resultingArray = applyChanges(existingImps, add, remove);

        const finalImpNames = await Promise.all(
            resultingArray.map(async (imp) => {
                const { name } = await ImplementerService.getImplementerName(imp);
                return name;
        }));

        try {
            await StrategyActivityService.create({
                    strategy_id: strategyId,
                    user_id: userId,
                    action: actionText,
                    summary: summaryText.join("\n"),
                    changes: { implementer_ids: { old: existingImpNames, new: finalImpNames } },
            });
        } catch (e) {
            return next(e);
        }
        

        if (primary_implementer) {
            try {
                let previous = "unassigned";
                if (currentPrimaryImp.implementer_id) {
                    previous = await ImplementerService.getImplementerName(Number(currentPrimaryImp.implementer_id));
                }
                
                await StrategyService.updatePrimaryImplementer(strategyId, primary_implementer);
                const { name } = await ImplementerService.getImplementerName(primary_implementer);
                await StrategyActivityService.create({
                    strategy_id: strategyId,
                    user_id: userId,
                    action: "UPDATE_PRIMARY",
                    summary: `Set primary implementer to ${name}`,
                    changes: { primary_implementer: { old: previous?.name ?? previous, new: name } },
                });
            } catch(e) {
                return next(e)
            }
        }

        try {
            const { changes, summary } = buildActivityChanges(strategy, rest);

            const updatedStrategy = await StrategyService.updateStrategyDetails(strategyId, {
                ...rest,
                updatedAt: new Date(),
            });

            if (Object.keys(changes).length > 0) {
                await StrategyActivityService.create({
                    strategy_id: strategyId,
                    user_id: userId,
                    action: "UPDATE",
                    summary,
                    changes,
                });
            }

            handleResponse(res, 200, "strategy updated successfully", updatedStrategy);
        } catch(e) {
            return next(e)
        }
    
    });

}



export const viewStrategyActivities = async (req, res, next) => {
    const strategyId = parseInt(req.params.id, 10);
    const skip = Math.max(0, Number(req.query.skip) || 0);
    const take = Math.min(Math.max(1, Number(req.query.take) || 50), 100);

    try {
        const activities = await StrategyActivityService.fetchByStrategyId(
            strategyId,
            { skip, take }
        );
        handleResponse(res, 200, "strategy activities retrieved successfully", activities);
    } catch(e) {
        return next(e);
    }
};

export const deleteStrategy = async (req, res, next) => {
    const strategyId = parseInt(req.params.id);

    let strategy;
    try {
        strategy = await StrategyService.getStrategyById(strategyId);
    } catch(e) {
        return next(e);
    }

    await authorize(canDelete, strategy)(req, res, async () => {
        try {
            const changes = {};
            for (const key of Object.keys(strategy)) {
                if (typeof strategy[key] !== "object" || strategy[key] === null) {
                    changes[key] = { old: strategy[key], new: null };
                }
            }
            await StrategyActivityService.create({
                strategy_id: strategyId,
                user_id: res.locals.user.id,
                action: "DELETE",
                summary: "Deleted strategy",
                changes,
            });

            const result = await prisma.strategy.delete({
                where: { id: strategyId },
            });
            handleResponse(res, 200, "strategy successfully deleted", result);
        } catch(e) {
            return next(e);
        }
    });
}
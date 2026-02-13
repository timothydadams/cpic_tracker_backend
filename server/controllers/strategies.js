import { authorize } from "../middleware/authorize.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { StrategyService } from "../services/strategies.js";
import { canCreate, canRead, canUpdate, canDelete } from "../resource_permissions/strategies.js";
import { parseBoolean, buildNestedIncludeObject, parseId } from "../utils/queryStringParsers.js";
import { UserService } from "../services/user.js";
import { ImplementerService } from "../services/implementers.js";
import { StrategyActivityService } from "../services/strategyActivity.js";
import { PolicyService } from "../services/policies.js";
import { FocusAreaService } from "../services/focus_areas.js";
import { pick } from "../utils/sanitize.js";
import { applyChanges } from "../utils/buildActivityChanges.js"
import { getUserSelect, buildCommentTree } from "../utils/commentTree.js";
import { als } from "../configs/context.js";

const STRATEGY_FIELDS = ['content', 'policy_id', 'strategy_number', 'timeline_id', 'status_id', 'focus_area_id', 'last_comms_date'];

const VALID_STRATEGY_INCLUDES = new Set([
    'focus_area', 'stakeholders', 'comments', 'timeline',
    'status', 'policy', 'implementers', 'activities',
]);

const MAX_INCLUDE_DEPTH = 2;
import { buildActivityChanges } from "../utils/buildActivityChanges.js";

export const viewMyStrategies = async (req, res) => {
    const userId = res.locals.user.id;
    //const isImplementer = res.locals.user.isImplementer;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const options = {};
    options.select = {
        implementer_org:true,
        assigned_implementers: true,
    }

    //options.select = isImplementer ? { implementer_org:true } : {assigned_implementers: true }
    const user = await UserService.getUserById(userId, options);

    const {implementer_org = null, assigned_implementers = null} = user;

    let results = {
        monitor: [],
        execute: [],
    };
    if (implementer_org) {
        const strategies = await ImplementerService.getImplementerStrategies(implementer_org.id);
        results.execute.push({
            implementer_org,
            strategies,
        });
    } 
    
    if (assigned_implementers) {
        for (const imp of assigned_implementers) {
            const strategies = await ImplementerService.getImplementerStrategies(imp.id);
            results.monitor.push({
                implementer_org: imp,
                strategies
            });
        }
    }

    handleResponse(res, 200, "strategies retrieved", results);
}



export const viewStrategy = async (req, res) => {
    const strategyId = parseId(req.params.id);

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

    const strategy = await StrategyService.getStrategyById(strategyId, includeItems);
    await authorize(canRead, strategy)(req, res, () => {
        handleResponse(res, 200, "strategy retrieved successfully", strategy);
    });
}

export const viewAllStrategies = async(req,res) => {
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

    const strategies = await StrategyService.getAll({
        where,
        include: prismaInclude,
        orderBy: parsedOrderBy,
    });

    handleResponse(res, 200, "strategies retrieved successfully", strategies);
}

export const viewStrategyStatuses = async(req, res) => {
    const statuses = await StrategyService.getStatuses();
    handleResponse(res, 200, "strategy statuses retrieved successfully", statuses);
}

export const viewStrategyComments = async(req, res) => {
    const id = parseId(req.params.id);
    const userSelect = getUserSelect(als);

    const comments = await StrategyService.getCommentsByStrategyId(id, {
        user: { select: userSelect },
    });

    const tree = buildCommentTree(comments);

    handleResponse(res, 200, "strategy comments retrieved successfully", tree);
}

export const viewTimelineOptions = async(req, res) => {
    const timelineOpts = await StrategyService.getTimelineOptions();
    handleResponse(res, 200, "strategy timeline options retrieved successfully", timelineOpts);
}

export const viewPolicies = async(req, res) => {
    const policies = await PolicyService.getAll();
    handleResponse(res, 200, "strategy policies retrieved successfully", policies);
}

export const viewFocusAreas = async(req, res) => {
    const areas = await FocusAreaService.getAll();
    handleResponse(res, 200, "strategy focus areas retrieved successfully", areas);
}

export const createStrategy = async(req, res) =>{
    const data = pick(req.body, STRATEGY_FIELDS);
    await authorize(canCreate)(req, res, async () => {
        const newStrategy = await StrategyService.create(data);

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

export const handleUpdateStrategy = async (req, res) => {
    const strategyId = parseId(req.params.id);

    const include = {
        implementers:true
    }

    const strategy = await StrategyService.getStrategyById(strategyId, include);

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
            await StrategyService.addImplementersToStrategy(add, strategyId);
            const addedImpNames = await Promise.all(
                add.map(async (imp) => {
                    const { name } = await ImplementerService.getImplementerName(imp);
                    return name;
            }));
            summaryText.push(`Added implementer(s): ${addedImpNames.join(", ")}`);
        }

        //remove implementers if changed
        if (remove.length > 0) {
            await StrategyService.deleteImplementersFromStrategy(remove, strategyId);
            const removeImpNames = await Promise.all(
                remove.map(async (imp) => {
                    const { name } = await ImplementerService.getImplementerName(imp);
                    return name;
            }));
            summaryText.push(`Removed implementer(s): ${removeImpNames.join(", ")}`);
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

        await StrategyActivityService.create({
                strategy_id: strategyId,
                user_id: userId,
                action: actionText,
                summary: summaryText.join("\n"),
                changes: { implementer_ids: { old: existingImpNames, new: finalImpNames } },
        });

        if (primary_implementer) {
            let previous = "unassigned";
            if (currentPrimaryImp?.implementer_id) {
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
        }

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
    });

}



export const viewStrategyActivities = async (req, res) => {
    const strategyId = parseId(req.params.id);
    const skip = Math.max(0, Number(req.query.skip) || 0);
    const take = Math.min(Math.max(1, Number(req.query.take) || 50), 100);
    const userSelect = getUserSelect(als);

    const activities = await StrategyActivityService.fetchByStrategyId(
        strategyId,
        { skip, take, userSelect }
    );
    handleResponse(res, 200, "strategy activities retrieved successfully", activities);
};

export const deleteStrategy = async (req, res) => {
    const strategyId = parseId(req.params.id);

    const strategy = await StrategyService.getStrategyById(strategyId);

    await authorize(canDelete, strategy)(req, res, async () => {
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

        const result = await StrategyService.delete(strategyId);
        handleResponse(res, 200, "strategy successfully deleted", result);
    });
}

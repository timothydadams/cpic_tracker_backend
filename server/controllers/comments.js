import { CommentService } from "../services/comments.js";
import { authorize } from "../middleware/authorize.js";
import { canCreate, canReadAll, canUpdate, canDelete } from "../resource_permissions/comments.js";
import { parseBoolean, parseId } from "../utils/queryStringParsers.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { StrategyActivityService } from "../services/strategyActivity.js";
import { pick } from "../utils/sanitize.js";

export const viewComment = async (req, res) => {
    const id = parseId(req.params.id);

    const children = parseBoolean(req.query.replies);

    const includeItems = {
        ...(children ? { children:{ include: {children: true}}} : {}),
    }

    const comment = await CommentService.getById(id, includeItems);
    handleResponse(res, 200, "comment retrieved successfully", comment);
}

export const viewAllComments = async(req,res) => {
    const children = parseBoolean(req.query.replies);

    const includeItems = {
        ...(children ? { children:{ include: {children: true}}} : {}),
    }

    await authorize(canReadAll)(req, res, async () => {
        const comments = await CommentService.getAll(includeItems);
        handleResponse(res, 200, "comments retrieved successfully", comments);
    });
}

export const createComment = async(req, res) =>{
    const data = {
        ...pick(req.body, ['content', 'parent_id']),
        strategy_id: req.body.strategy_id,
        user_id: res.locals.user.id,
    };
    await authorize(canCreate)(req, res, async () => {
        const comment = await CommentService.create(data);
        await StrategyActivityService.create({
            strategy_id: comment.strategy_id,
            user_id: res.locals.user.id,
            action: "ADD_COMMENT",
            summary: "Added a comment",
            changes: { comment_id: { old: null, new: comment.id } },
        });
        handleResponse(res, 200, "comment created successfully", comment);
    });
}

export const updateComment = async (req, res) => {
    const id = parseId(req.params.id);
    const data = pick(req.body, ['content']);
    const comment = await CommentService.getById(id);
    await authorize(canUpdate, comment)(req, res, async () => {
        const updatedComment = await CommentService.update(id, data);
        await StrategyActivityService.create({
            strategy_id: comment.strategy_id,
            user_id: res.locals.user.id,
            action: "UPDATE_COMMENT",
            summary: "Updated a comment",
            changes: {
                content: { old: comment.content, new: updatedComment.content },
            },
        });
        handleResponse(res, 200, "comment updated successfully", updatedComment);
    });
}

export const deleteComment = async (req, res) => {
    const id = parseId(req.params.id);
    const comment = await CommentService.getById(id);
    await authorize(canDelete, comment)(req, res, async () => {
        const result = await CommentService.delete(id);
        handleResponse(res, 200, "comment successfully deleted", result);
    });
}
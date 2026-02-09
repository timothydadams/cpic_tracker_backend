import { CommentService } from "../services/comments.js";
import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canReadAll, canUpdate, canDelete } from "../resource_permissions/comments.js";
import { parseBoolean } from "../utils/queryStringParsers.js";
import { handleResponse } from "../utils/defaultResponse.js";

export const viewComment = async (req, res) => {
    const id = parseInt(req.params.id,10);

    const children = parseBoolean(req.query.replies);

    const includeItems = {
        ...(children ? { children:{ include: {children: true}}} : {}),
    }

    const comment = await CommentService.getById(id, includeItems);
    authorize(canRead, comment)(req, res, () => {
        handleResponse(res, 200, "comment retrieved successfully", comment);
    });
}

export const viewAllComments = async(req,res) => {
    const children = parseBoolean(req.query.replies);

    const includeItems = {
        ...(children ? { children:{ include: {children: true}}} : {}),
    }

    authorize(canReadAll)(req, res, async () => {
        const comments = await CommentService.getAll(includeItems);
        handleResponse(res, 200, "comments retrieved successfully", comments);
    });
}

export const createComment = async(req, res) =>{
    const data = req.body;
    authorize(canCreate)(req, res, async () => {
        const comment = await CommentService.create(data);
        handleResponse(res, 200, "comment created successfully", comment);
    });
}

export const updateComment = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const comment = await CommentService.getById(id);
    authorize(canUpdate, comment)(req, res, async () => {
        const updatedComment = await CommentService.update(id, data);
        handleResponse(res, 200, "comment updated successfully", updatedComment);
    });
}

export const deleteComment = async (req, res) => {
    const id = parseInt(req.params.id);
    const comment = await CommentService.getById(id);
    authorize(canDelete, comment)(req, res, async () => {
        const result = await CommentService.delete(id);
        handleResponse(res, 200, "comment successfully deleted", result);
    });
}
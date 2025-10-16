import { prisma } from "../configs/db.js";
import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canReadAll, canUpdate, canDelete } from "../policies/comments.js";
import { parseBoolean } from "../utils/queryStringParsers.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const getCommentById = async (id, res, includedItems = null) => {
    const comment = await prisma.comment.findUnique({
        where:{
            id
        },
        ...(includedItems != null && {include:includedItems}),
    });

    if (!comment) {
        handleResponse(res, 404, "comment not found");
    } else {
        return comment
    }
}

export const viewComment = async (req, res) => {
    const id = parseInt(req.params.id,10);

    const children = parseBoolean(req.query.replies);

    const includeItems = {
        ...(children ? { children:{ include: {children: true}}} : {}),
    }

    const comment = await getCommentById(id, res, includeItems);
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
        const comments = await prisma.comment.findMany({
            include:includeItems
        });
        handleResponse(res, 200, "comments retrieved successfully", comments);
    });
}



export const createComment = async(req, res) =>{
    const data = req.body;
    authorize(canCreate)(req, res, async () => {
        const comment = await prisma.comment.create({
            data
        });
        handleResponse(res, 200, "implementer created successfully", newImp);
    });
}

export const updateComment = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const comment = await getCommentById(id, res);
    authorize(canUpdate, comment)(req, res, async () => {
        const updatedComment = await prisma.comment.update({
            where:{
                id
            },
            data,
        });
        handleResponse(res, 200, "comment updated successfully", updatedComment);
    });
}

export const deleteComment = async (req, res) => {
    const id = parseInt(req.params.id);
    const comment = await getCommentById(id, res);
    authorize(canDelete, comment)(req, res, async () => {
        const result = await prisma.comment.delete({
            where:{
                id
            },
        });
        handleResponse(res, 200, "comment successfully deleted", result);
    });
}
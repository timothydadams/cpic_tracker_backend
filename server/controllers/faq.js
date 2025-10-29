import { prisma } from "../configs/db.js";
import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../policies/faq.js";
import { parseBoolean } from "../utils/queryStringParsers.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data,
    })
}

const getFAQById = async (id, res, includedItems = null) => {
    const faq = await prisma.faq.findUnique({
        where:{
            id
        },
    });

    if (!faq) {
        handleResponse(res, 404, "faq not found");
    } else {
        return faq
    }
}

export const viewFAQ = async (req, res) => {
    const id = parseInt(req.params.id,10);

    const faq = await getCommentById(id, res);
    authorize(canRead, faq)(req, res, () => {
        handleResponse(res, 200, "faq retrieved successfully", faq);
    });
}

export const viewAllFAQs = async(req,res) => { 
    authorize(canRead)(req, res, async () => {
        const faqs = await prisma.faq.findMany({});
        handleResponse(res, 200, "faqs retrieved successfully", faqs);
    });
}



export const createFAQ = async(req, res) =>{
    const data = req.body;
    authorize(canCreate)(req, res, async () => {
        const faq = await prisma.faq.create({
            data
        });
        handleResponse(res, 200, "faq created successfully", faq);
    });
}

export const updateFAQ = async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const faq = await getFAQById(id, res);
    authorize(canUpdate, faq)(req, res, async () => {
        const updatedFAQ = await prisma.comment.update({
            where:{
                id
            },
            data,
        });
        handleResponse(res, 200, "faq updated successfully", updatedFAQ);
    });
}

export const deleteFAQ = async (req, res) => {
    const id = parseInt(req.params.id);
    const faq = await getFAQById(id, res);
    authorize(canDelete, faq)(req, res, async () => {
        const result = await prisma.faq.delete({
            where:{
                id
            },
        });
        handleResponse(res, 200, "faq successfully deleted", result);
    });
}
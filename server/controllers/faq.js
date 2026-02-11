import { authorize } from "../middleware/authorize.js";
import { canCreate, canRead, canUpdate, canDelete } from "../resource_permissions/faq.js";
import { parseId } from "../utils/queryStringParsers.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { pick } from "../utils/sanitize.js";
import { FAQService } from "../services/faq.js";

const FAQ_FIELDS = ['question', 'answer'];

export const viewFAQ = async (req, res) => {
    const id = parseId(req.params.id);
    const faq = await FAQService.getById(id);
    await authorize(canRead, faq)(req, res, () => {
        handleResponse(res, 200, "faq retrieved successfully", faq);
    });
}

export const viewAllFAQs = async(req,res) => {
    await authorize(canRead)(req, res, async () => {
        const faqs = await FAQService.getAll();
        handleResponse(res, 200, "faqs retrieved successfully", faqs);
    });
}



export const createFAQ = async(req, res) =>{
    const data = pick(req.body, FAQ_FIELDS);
    await authorize(canCreate)(req, res, async () => {
        const faq = await FAQService.create(data);
        handleResponse(res, 200, "faq created successfully", faq);
    });
}

export const updateFAQ = async (req, res) => {
    const id = parseId(req.params.id);
    const data = pick(req.body, FAQ_FIELDS);
    const faq = await FAQService.getById(id);
    await authorize(canUpdate, faq)(req, res, async () => {
        const updatedFAQ = await FAQService.update(id, data);
        handleResponse(res, 200, "faq updated successfully", updatedFAQ);
    });
}

export const deleteFAQ = async (req, res) => {
    const id = parseId(req.params.id);
    const faq = await FAQService.getById(id);
    await authorize(canDelete, faq)(req, res, async () => {
        const result = await FAQService.delete(id);
        handleResponse(res, 200, "faq successfully deleted", result);
    });
}

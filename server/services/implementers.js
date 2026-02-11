import { prisma } from "../configs/db.js";
import { StrategyService } from "./strategies.js";
import { AppError } from "../errors/AppError.js";

export const ImplementerService = {

    async getImplementerName (implementerId) {
        try {
            return prisma.implementer.findFirst({
                where:{
                    id:Number(implementerId)
                },
                select: {
                    name:true
                }
            });
        } catch(e) {
            throw e
        } 
    },
    
    async getImplementerStrategies (implementer_id) {
        const results = {}
        try {
            results.primary = await StrategyService.getStrategiesForImplementer(implementer_id, true);
            results.support = await StrategyService.getStrategiesForImplementer(implementer_id, false);
            return results;
        } catch(e) {
            throw e
        }
    },

    async getImplementerDetails(id){
        try {
            return await prisma.implementer.findFirst({
                where:{id}
            });
        } catch(e){
            throw e
        }
    },
    
};
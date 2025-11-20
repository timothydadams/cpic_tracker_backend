import { prisma } from "../configs/db.js";
import { AppError } from "../errors/AppError.js";

export const StrategyService = {

    async getStrategyById (id, include = null) {
        try {
            return await prisma.strategy.findUnique({
                where:{
                    id
                },
                ...(include ? {include} : {}),
            });
        } catch(e) {
            throw e
        }
    },

    async updateStrategyDetails (id, data) {
        try {
            return await prisma.strategy.update({
                where:{
                    id,
                },
                data,
            });
        } catch (e) {
            throw e
        }
    },

    async addImplementersToStrategy (implementerIds, strategyId) {
    
        if (!Array.isArray(implementerIds)) {
            throw new AppError("implementerIds must be an array of implementer ids");
        }

        const data = implementerIds.map(id => ({
            implementer_id: id,
            strategy_id: strategyId,
        }));

        try {
            return await prisma.strategyImplementer.createMany({
                data
            });
        } catch(e) {
            throw e
        }
    },

    async deleteImplementersFromStrategy (implementerIds, strategyId){
        try {
            return await prisma.strategyImplementer.deleteMany({
                where: {
                    strategy_id: strategyId,
                    implementer_id: {
                        in: implementerIds //array of implementer ids
                    },
                }
            });
        } catch(e) {
            console.log('error removing implementers');
            throw(e);
        }
    },

    async _unsetPrimaryImplementer (strategy_id) {
        //set all current strategy joint table is_primary entries to false
        try {
            return prisma.strategyImplementer.updateManyAndReturn({
                where: {
                    strategy_id
                },
                data: {
                    is_primary: false,
                }
            });
        } catch(e) {
            console.log(`error setting 'is_primary:false' on all implementers for strategy_id: ${strategy_id}`);
            throw e
        }
    },

    async updatePrimaryImplementer(strategy_id, primary_implementer_id) {
        try {
            await this._unsetPrimaryImplementer(strategy_id);
            return await prisma.strategyImplementer.update({
                where: {
                  implementer_id_strategy_id: {
                    implementer_id: Number(primary_implementer_id),
                    strategy_id,
                  },
                },
                data: {
                    is_primary: true,
                }
            });
        } catch (e) {
            throw e
        }
    },

    async getStrategiesForImplementer(implementer_id, is_primary = null) {
        try {
            return await prisma.strategy.findMany({
                where: {
                    implementers: {
                        some: {
                            implementer_id,
                            ...(is_primary !== null ? {is_primary} : {}),
                        }
                    }
                },
                include: {
                    status:true,
                    focus_area:true,
                    policy:true,
                    timeline:true,
                    implementers: {
                        include: {
                            implementer:true
                        }
                    }

                }
            });
        } catch(e) {
            throw e
        }
        
    }
    
};
import { prisma } from "../configs/db.js";
import { PUBLIC_USER_SELECT } from "../utils/commentTree.js";

export const StrategyActivityService = {

  async create(data) {
    const { strategy_id, ...rest } = data;
    return await prisma.strategyActivity.create({
      data: {
        strategy_id: Number(strategy_id),
        ...rest,
      },
    });
  },

  async update(id, data) {
    return await prisma.strategyActivity.update({
      where: { id },
      data,
    });
  },

  async fetchByStrategyId(strategy_id, { skip = 0, take = 50, userSelect = PUBLIC_USER_SELECT } = {}) {
    return await prisma.strategyActivity.findMany({
      where: { strategy_id: Number(strategy_id) },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        user: {
          select: userSelect,
        },
      },
    });
  },

  async fetchByUserId(user_id, { skip = 0, take = 50 } = {}) {
    return await prisma.strategyActivity.findMany({
      where: { user_id },
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: {
        strategy: true,
      },
    });
  },
};

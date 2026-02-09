import { prisma } from "../configs/db.js";
import { AppError } from "../errors/AppError.js";
import { v4 } from "uuid";

export const CommentService = {

  async getById(id, include = null) {
    const comment = await prisma.comment.findUnique({
      where: { id },
      ...(include ? { include } : {}),
    });

    if (!comment) {
      throw new AppError("Comment not found", 404);
    }

    return comment;
  },

  async getAll(include = null) {
    return await prisma.comment.findMany({
      ...(include ? { include } : {}),
    });
  },

  async create(data) {
    const { strategy_id, ...rest } = data;
    return await prisma.comment.create({
      data: {
        strategy_id: Number(strategy_id),
        ...rest,
      },
    });
  },

  async update(id, data) {
    return await prisma.comment.update({
      where: { id },
      data,
    });
  },

  async delete(id) {
    return await prisma.comment.delete({
      where: { id },
    });
  },
};

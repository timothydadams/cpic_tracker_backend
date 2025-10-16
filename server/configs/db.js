import { PrismaClient } from '../../prisma/generated/prisma/index.js'
import { withAccelerate } from '@prisma/extension-accelerate'


export const prisma = new PrismaClient().$extends(withAccelerate())
import { PrismaClient } from '../../prisma/generated/prisma/index.js'
import { withAccelerate } from '@prisma/extension-accelerate'
import { removePiiExtension } from './prisma-pii-extenstion.js'

export const prisma = new PrismaClient()
    .$extends(removePiiExtension)
    .$extends(withAccelerate())
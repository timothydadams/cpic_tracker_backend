import { PrismaClient } from '../../prisma/generated/prisma/index.js'
import { withAccelerate } from '@prisma/extension-accelerate'
import { removePiiExtension } from './prisma-pii-extenstion.js'

const use_accelerate = process.env.DATABASE_URL.split(":")[0] === "prisma+postgres"
const prisma = new PrismaClient()
    .$extends(removePiiExtension)
    //.$extends(withAccelerate())

if (use_accelerate) {
    console.log('adding accelerate extension');
    prisma.$extends(withAccelerate())
}

export {prisma};
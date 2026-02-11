import { jwtVerify } from 'jose';
import { redis } from '../index.js';
import { als } from '../configs/context.js';

const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

export const requireGlobalAdmin = async(req,res,next) => {
    const { id, isGlobalAdmin } = res.locals.user;
    if (!id || isGlobalAdmin === false) return res.sendStatus(403);
    next();
}


export const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = header.split(' ')[1];

    let isBlacklisted = false;
    try {
        isBlacklisted = await redis.exists(`token_bl_${token}`) !== 0;
    } catch (err) {
        console.error('Redis unavailable in verifyToken — denying request');
        return res.status(503).json({ error: 'Service temporarily unavailable' });
    }

    if (isBlacklisted) {
        console.warn('BLACKLISTED TOKEN USAGE ATTEMPTED');
        return res.sendStatus(403);
    }

    try {
        const { payload: decoded } = await jwtVerify(token, accessSecret);
        res.locals.user = decoded;
        const roleNames = decoded.roles.map(x => x.toLowerCase());

        res.locals.user.isCPICMember = ['cpic member'].some((needle) =>roleNames.includes(needle));
        res.locals.user.isGlobalAdmin = ['admin'].some((needle) => roleNames.includes(needle));
        res.locals.user.isCPICAdmin = ["cpic admin"].some((needle) => roleNames.includes(needle));
        res.locals.user.isImplementer = ["implementer"].some((needle) => roleNames.includes(needle));

        // Sync ALS store so PII extension is consistent with route-level auth
        const store = als.getStore();
        if (store) {
            store.isAuthenticated = true;
            store.user = decoded.id;
        }

        next();
    } catch (err) {
        return res.status(401).json({error:"invalid token"});
    }
}
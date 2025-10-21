import jwt from 'jsonwebtoken';
import { redis } from '../index.js';

export const requireGlobalAdmin = async(req,res,next) => {
    const { id, isGlobalAdmin } = res.locals.user;
    if (!id || isGlobalAdmin === false) return res.sendStatus(403);
    next();
}


export const verifyToken = async (req, res, next) => {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = header.split(' ')[1];
    const isBlacklisted = await redis.exists(`token_bl_${token}`) !== 0;

    if (isBlacklisted) {
        console.warn('BLACKLISTED TOKEN USAGE ATTEMPTED', token);
        return res.sendStatus(403);
    }
    
    jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET, 
        (err, decoded) => {
            console.log('decoded user', decoded);

            if (err) return res.status(401).json({error:"invalid token"});
            res.locals.user = decoded;
            const roleNames = decoded.roles.map(x => x.toLowerCase());

            res.locals.user.isCPICMember = ['cpic member'].some((needle) =>roleNames.includes(needle));
            res.locals.user.isGlobalAdmin = ['admin'].some((needle) => roleNames.includes(needle));
            res.locals.user.isCPICAdmin = ["cpic admin"].some((needle) => roleNames.includes(needle));
            res.locals.user.isImplementer = ["implementer"].some((needle) => roleNames.includes(needle));

            //console.log('res user object:', res.locals.user);
            next();
        }
    );
}
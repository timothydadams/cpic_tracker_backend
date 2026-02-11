import { jwtVerify } from 'jose';
import { als } from '../configs/context.js';
import { redis } from '../index.js';

const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

export const userContextMiddleware = async (req, res, next) => {
  let isAuthenticated = false;
  let user = null;

  // Priority 1: Check access token from Authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader?.startsWith('Bearer ')) {
    const accessToken = authHeader.split(' ')[1];
    try {
      let isBlacklisted = false;
      try {
        isBlacklisted = await redis.exists(`token_bl_${accessToken}`) !== 0;
      } catch (redisErr) {
        // Redis unavailable, skip blacklist check — fail open for PII context only
        console.error('Redis unavailable in userContextMiddleware', redisErr);
      }

      if (!isBlacklisted) {
        const { payload: decoded } = await jwtVerify(accessToken, accessSecret);
        user = decoded.id;
        isAuthenticated = true;
      }
    } catch (err) {
      // Invalid/expired access token, fall through to cookie check
    }
  }

  // Priority 2: Fall back to refresh token cookie (covers logged-in users on public routes
  // where the frontend doesn't send an Authorization header)
  if (!isAuthenticated) {
    const refreshCookie = req.cookies?.jwt_cpic;
    if (refreshCookie) {
      try {
        const { payload: decoded } = await jwtVerify(refreshCookie, refreshSecret);
        user = decoded.id;
        isAuthenticated = true;
      } catch (err) {
        // Invalid/expired refresh token, continue as unauthenticated
      }
    }
  }

  als.run({ isAuthenticated, user }, () => next());
};

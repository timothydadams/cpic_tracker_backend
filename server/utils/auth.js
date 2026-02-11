import { SignJWT } from 'jose';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

const accessSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);
const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

export const cookieLife = 24*60*60*1000;

export const comparePasswords = (password, hash) => bcrypt.compare(password, hash);

export const hashPassword = (pw) => bcrypt.hash(pw, Number(process.env.PW_SALT));
export const hashSyncPassword = (pw) => bcrypt.hashSync(pw, Number(process.env.PW_SALT));


const claim_keys = [
    'id',
    'email',
    'roles',
    'name',
    'display_name',
    'given_name',
    'family_name',
    'nickname',
    'profile_pic',
];

export const getAuthedGoogleClient = () => {
    const apiDomain = process.env.NODE_ENV === "development" 
        ? `http://localhost:3500` 
        : `https://api.cpic.dev`;

    const redirectURL = `${apiDomain}/api/auth/google-callback/`;

    return new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri:redirectURL,
    });
}

export const createObjFromFilteredKeys = (userObject, desiredFields) => Object.fromEntries(
    Object.entries(userObject).filter(([key]) => desiredFields.includes(key))
);

export const createJWT = async (user, duration = "SHORT") => {

    const access_token_claims = createObjFromFilteredKeys(user, claim_keys);
    const { id } = access_token_claims;


    const refreshTokenExpiration = duration == "SHORT"
        ? process.env.JWT_REFRESH_LIFE_SHORT
        : process.env.JWT_REFRESH_LIFE_LONG

    const accessToken = await new SignJWT(access_token_claims)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(process.env.JWT_ACCESS_LIFE)
        .sign(accessSecret);

    const refreshToken = await new SignJWT({ id })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(refreshTokenExpiration)
        .sign(refreshSecret);

    return { accessToken, refreshToken }
}

export const ensureUint8Array = (data) => {
    if (data instanceof Uint8Array) {
        return data;
    }
    
    // Handle standard arrays of numbers
    if (Array.isArray(data)) {
        return new Uint8Array(data);
    }
    
    // Handle Node.js Buffers
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(data)) {
      return new Uint8Array(data);
    }

    // Handle other TypedArrays by using their underlying buffer
    if (ArrayBuffer.isView(data)) {
      return new Uint8Array(data.buffer);
    }
    
    // Handle simple object format like {'0': 165, '1':1, ...}
    if (typeof data === 'object' && data !== null && '0' in data) {
      const arr = Object.values(data);
      if (arr.every(num => typeof num === 'number' && num >= 0 && num <= 255)) {
        return new Uint8Array(arr);
      }
    }

    throw new Error('Unsupported data format for Uint8Array conversion.');
}
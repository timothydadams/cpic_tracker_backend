import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

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

export const generateCookieConfig = (duration = "SHORT") => {
    return { 
        httpOnly:true, 
        sameSite:'lax', 
        secure:process.env.NODE_ENV === 'production',
        maxAge: duration == "SHORT"
            ? Number(process.env.COOKIE_LIFE_SHORT)
            : Number(process.env.COOKIE_LIFE_LONG)
    }
};

export const createObjFromFilteredKeys = (userObject, desiredFields) => Object.fromEntries(
    Object.entries(userObject).filter(([key]) => desiredFields.includes(key))
);

export const createJWT = (user, duration = "SHORT") => {

    const access_token_claims = createObjFromFilteredKeys(user, claim_keys);
    const { id } = access_token_claims;

    
    const refreshTokenExpiration = duration == "SHORT" 
        ? process.env.JWT_REFRESH_LIFE_SHORT
        : process.env.JWT_REFRESH_LIFE_LONG

    const accessToken = jwt.sign(
        access_token_claims,
        process.env.JWT_ACCESS_SECRET,
        { 
            expiresIn: process.env.JWT_ACCESS_LIFE,
            //algorithm: 'HS256'
        }
    );

    const refreshToken = jwt.sign(
        {id},
        process.env.JWT_REFRESH_SECRET,
        { 
            expiresIn: refreshTokenExpiration,
            //algorithm: 'HS256'
        }
    )

    return { accessToken, refreshToken }
}
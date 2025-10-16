import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const cookieLife = 24*60*60*1000;

export const comparePasswords = (password, hash) => bcrypt.compare(password, hash);

export const hashPassword = (pw) => bcrypt.hash(pw, Number(process.env.PW_SALT));


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

const generateClaims = (userObject) => Object.fromEntries(
    Object.entries(userObject).filter(([key]) => claim_keys.includes(key))
);

export const createJWT = (user, duration = "SHORT") => {

    const access_token_claims = generateClaims(user);
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
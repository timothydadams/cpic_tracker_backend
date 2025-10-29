import { prisma } from "../configs/db.js";
import {decode} from 'jsonwebtoken';
import { redis } from "../index.js";
import jwt from 'jsonwebtoken';
import { comparePasswords, createJWT } from "../utils/auth.js";
import { OAuth2Client } from "google-auth-library";
import { google } from 'googleapis';

//import { query, getRestrictedClient } from "../db/index.js";

const goog_oauth_client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
);


const findRoleByName = async(name) => {
    try {
        const role = await prisma.role.findUnique({
            where:{
                name
            },
        });
        return role;
    } catch(e){
        console.log(e);
    }
}

const findUserForSignIn = async (val, key = "id") => {
    const whereClause = {}
    whereClause.disabled = false;
    whereClause[key] = val;

    console.log('where clause:', whereClause);

    const includeItems = {
        userRoles: {
            include: {
                role: {
                    select:{
                        name:true,
                    }
                },
            }
        },
    }

    try {
        const validUser = await prisma.user.findUnique({
            where: whereClause,
            include: includeItems,
        });

        if (!validUser) return null;
        
        const {userRoles, ...userObject} = validUser;

        const newUserObj = {
            ...userObject,
            roles: userRoles.map(({role}) => role.name),
        }

        console.log('findusersignin', newUserObj);
        return newUserObj

    } catch(e) {
        console.log(e)
        return {}
    }
}


/*
LOGOUT CONTROLLER
*/
export const handleLogout = async(req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt_cpic) {
        return res.sendStatus(204);
    }
    const token = cookies.jwt_cpic;
    //if there is a token, add to redis blacklist until it expires
    const expTime = decode(token).exp * 1000 - Date.now();
    if (expTime > 0) {
        await redis.set(`token_bl_${token}`,token,'PX', expTime);
    }
    
    res.clearCookie('jwt_cpic', { httpOnly:true, sameSite:'lax', secure:true});
    res.json({ message: "cleared cookies"});
}

/*
REFRESH TOKEN CONTROLLER (token rotation)
*/
export const handleRefreshToken = async(req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt_cpic) return res.status(401).json({
        message: "No token sent"
    });

    const token = cookies.jwt_cpic;

    jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET, 
        async (err, decoded) => {
            
            if (err || !decoded?.id) {
                //console.log('on refresh error:', {err, decoded});
                res.clearCookie('jwt_cpic', { httpOnly:true, sameSite:'lax', secure:true})
                return res.status(401).json({message:"forbidden"});
            }
            
            const validUser = await findUserForSignIn(decoded.id);

            if (!validUser) {
                return res.status(401).json({ message: "No enabled user"})
            }

            //console.log("valid user from refresh:", validUser)

            const { duration } = req.body;
            //console.log(`generated ${duration} tokens`);
            const {refreshToken, accessToken} = createJWT(validUser, duration);

            const expTime = jwt.decode(token).exp * 1000 - Date.now();
            await redis.set(`token_bl_${token}`,token,'PX', expTime);

            
            //send refresh token via httpOnly cookie (not accessible via js)
            res.cookie('jwt_cpic', refreshToken, { 
                httpOnly:true, 
                sameSite:'lax', 
                secure:true,
                maxAge: duration == "SHORT"
                ? Number(process.env.COOKIE_LIFE_SHORT)
                : Number(process.env.COOKIE_LIFE_LONG)
            });
            
            res.json({ accessToken })
        }
    );

}


/*
SIGNIN CONTROLLER
*/
export const handleGoogleSignIn = async(req, res) => {
    const code = req.query.code;

    const clientDomain = process.env.NODE_ENV === "development" ? `http://localhost:3000` : `https://cpic.dev`;
    const apiDomain = process.env.NODE_ENV === "development" ? `http://localhost:3500` : `https://cpic-tracker-api.onrender.com`;

    const { 
        persist = "SHORT"
     } = JSON.parse(decodeURIComponent(req.query.state));

    const duration = persist;
    const redirectURL = `${apiDomain}/api/auth/google-callback/`;
    const goog_oauth_client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri:redirectURL
    });

    if (!code) return res.status(400).json({error: 'google auth code must be provided'});

    try {

        const {tokens} = await goog_oauth_client.getToken(code);

        // Verify the ID token with Google's API
        const ticket = await goog_oauth_client.verifyIdToken({
            idToken: tokens.id_token,
        });

        if (!ticket) return res.status(400).json({"error":"google authentication failed"});

        await goog_oauth_client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: goog_oauth_client,
            version: 'v2',
        });

        const {data} = await oauth2.userinfo.get();
        //console.log('user data:', data);
        const {id, email, name, given_name, family_name, picture} = data;

        if (!id) return res.status(400).json({"error":"failed to retrieve user's google profile"});


        //update to only support invited users (must already exist in user table)

        const {id:userId} = await prisma.user.update({
            where: {
                google_id: id
            },
            data: {
                    auth_source: 'google',
                    email,
                    given_name,
                    family_name,
                    display_name: `${given_name} ${family_name}`,
                    profile_pic: picture,
            },
        });

        if (!userId) {
            return res.status(401).json({error: 'unauthorized user'});
        }

        const userWithRoles = await findUserForSignIn(userId, "id");

        //console.log('user', userWithRoles);

        const {refreshToken, accessToken} = createJWT(userWithRoles, duration);

        //send refresh token via httpOnly cookie (not accessible via js)
        res.cookie('jwt_cpic', refreshToken, { 
            httpOnly:true, 
            sameSite:'lax', 
            secure:true,
            maxAge: duration == "SHORT"
                ? Number(process.env.COOKIE_LIFE_SHORT)
                : Number(process.env.COOKIE_LIFE_LONG)
        });

        res.redirect(303, clientDomain);

    } catch(e) {
        //console.log(e);
        res.json({error:"there was a problem with prisma upsert google handler"})
    }
}


export const handleSelfSignIn = async (req,res) => {
    const { email, password, duration } = req.body;
    //console.log({email, password, duration})
    
    if (!email || !password) return res.status(400).json({error: 'username and password are required'});

    const validUser = await findUserForSignIn(email, "email");
    
    if (!validUser?.id || !validUser?.password_hash) return res.sendStatus(409);
    
    const match = await comparePasswords(password, validUser.password_hash);

    if (!match) return res.sendStatus(409);

    console.log('new login via email/pw:', {id:validUser.id, email:validUser.email, duration});

    const {refreshToken, accessToken} = createJWT(validUser, duration);

    //send refresh token via httpOnly cookie (not accessible via js)
    res.cookie('jwt_cpic', refreshToken, { 
        httpOnly:true, 
        sameSite:'lax', 
        secure:true,
        maxAge: duration == "SHORT"
        ? Number(process.env.COOKIE_LIFE_SHORT)
        : Number(process.env.COOKIE_LIFE_LONG)
    })

    res.json({ accessToken });

}
import { prisma } from "../configs/db.js";
import {decode} from 'jsonwebtoken';
import { redis } from "../index.js";
import jwt from 'jsonwebtoken';
import { comparePasswords, createJWT } from "../utils/auth.js";
//import { OAuth2Client } from "google-auth-library";
import { getAuthedGoogleClient, createObjFromFilteredKeys } from '../utils/auth.js';
import { google } from 'googleapis';
import { AppError } from "../errors/AppError.js";
import { InviteCodeService } from "../services/invites.js";
import { UserService } from "../services/user.js";

//import { query, getRestrictedClient } from "../db/index.js";

const baseCookieSettings = { 
    httpOnly:true, 
    sameSite:'Strict', 
    secure:true
}

/*
const findUserForSignIn = async (val, key = "id") => {
    const whereClause = {}
    whereClause.disabled = false;
    whereClause[key] = val;

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

        //console.log('findusersignin', newUserObj);
        return newUserObj

    } catch(e) {
        console.log(e)
        return {}
    }
}
*/


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
    
    res.clearCookie('jwt_cpic', baseCookieSettings);
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
                res.clearCookie('jwt_cpic', baseCookieSettings)
                return res.status(401).json({message:"forbidden"});
            }
            
            const validUser = await UserService.findUserForSignIn(decoded.id);

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
                ...baseCookieSettings,
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

    const { 
        persist = "SHORT",
        path: { pathname = "/"},
        inviteCode = null,
    } = JSON.parse(decodeURIComponent(req.query.state));

    let newUserRole = null;

    if (inviteCode) {
        const validation = await InviteCodeService.validate(inviteCode);
        if (!validation.valid) {
            throw new AppError(validation.reason, 400);
        }
        newUserRole = validation.invite.roleId;
    }

    const duration = persist;

    const goog_oauth_client = getAuthedGoogleClient();

    if (!code) throw new AppError('google auth code must be provided', 400, {inviteCode});

    try {

        const {tokens} = await goog_oauth_client.getToken(code);

        // Verify the ID token with Google's API
        const ticket = await goog_oauth_client.verifyIdToken({
            idToken: tokens.id_token,
        });

        if (!ticket) throw new AppError("google tokens could not be verified", 400, {inviteCode});

        await goog_oauth_client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: goog_oauth_client,
            version: 'v2',
        });

        const {data} = await oauth2.userinfo.get();

        if (!data?.id) throw new AppError("failed to retrieve google profile data", 400, {inviteCode});

        const {id, ...properties} = data;

        const desired_keys = ["email", "given_name", "family_name"];
        
        //generate user object from google identity
        const filteredData = createObjFromFilteredKeys(properties, desired_keys);
        filteredData["auth_source"] = 'google';
        filteredData["profile_pic"] = data.picture;
        filteredData["google_id"] = id;
        filteredData["display_name"] = `${filteredData.given_name} ${filteredData.family_name}`;
        
        let user = null;

        if (inviteCode && newUserRole) {
            const newUser = await UserService.register(filteredData, {roleId:newUserRole, inviteCode});
            if (!newUser?.id || !newUser?.email) {
                throw new AppError("failed to create user", 400,{inviteCode});
            }
            user = newUser;
            await InviteCodeService.markAsUsed(inviteCode, user.id);
        } else {
            user = await prisma.user.update({
                where: {
                    google_id: id
                },
                data: filteredData,
            });
        }

        if (!user?.id) {
            throw new AppError("unauthorized user", 401, {inviteCode});
        }

        const userWithRoles = await UserService.findUserForSignIn(user.id, "id");

        const {refreshToken, accessToken} = createJWT(userWithRoles, duration);

        //send refresh token via httpOnly cookie (not accessible via js)
        res.cookie('jwt_cpic', refreshToken, { 
            ...baseCookieSettings,
            maxAge: duration == "SHORT"
                ? Number(process.env.COOKIE_LIFE_SHORT)
                : Number(process.env.COOKIE_LIFE_LONG)
        });

        return res.redirect(303, `${clientDomain}${pathname}`);

    } catch(e) {
        throw e;
    }
}


export const handleSelfSignIn = async (req,res) => {
    const { email, password, duration } = req.body;
    //console.log({email, password, duration})
    
    if (!email || !password) return res.status(400).json({error: 'username and password are required'});

    const validUser = await UserService.findUserForSignIn(email, "email");
    
    if (!validUser?.id || !validUser?.password_hash) return res.sendStatus(409);;
    
    const match = await comparePasswords(password, validUser.password_hash);

    if (!match) return res.sendStatus(409);

    //console.log('new login via email/pw:', {id:validUser.id, email:validUser.email, duration});

    const {refreshToken, accessToken} = createJWT(validUser, duration);

    //send refresh token via httpOnly cookie (not accessible via js)
    res.cookie('jwt_cpic', refreshToken, { 
        ...baseCookieSettings,
        maxAge: duration == "SHORT"
        ? Number(process.env.COOKIE_LIFE_SHORT)
        : Number(process.env.COOKIE_LIFE_LONG)
    })

    res.json({ accessToken });

}
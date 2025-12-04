import {decode} from 'jsonwebtoken';
import { redis } from "../index.js";
import jwt from 'jsonwebtoken';
import { 
    comparePasswords, 
    createJWT,
    createObjFromFilteredKeys,
    ensureUint8Array,
 } from "../utils/auth.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { AppError } from "../errors/AppError.js";
import { InviteCodeService } from "../services/invites.js";
import { UserService } from "../services/user.js";
import { AuthService } from "../services/auth.js";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';

const baseCookieSettings = { 
    httpOnly:true, 
    sameSite:'Strict', 
    secure:true
}

const rpID = process.env.NODE_ENV === "development" ? `localhost` : `cpic.dev`;
const origin = process.env.NODE_ENV === "development" ? [`http://${rpID}`, `http://${rpID}:3000`] : `https://${rpID}`;

//get options for user to sign in
export const generateAuthOptions = async (req,res) => {
    const { email } = req.body;
    console.log('generating auth options for:', email);
    const user = await AuthService.findUserForSignIn(email, "email");

    if (!email || !user) {
        
        const empty = await generateAuthenticationOptions({
            rpID,
            allowCredentials: [].map(passkey => ({
                id: passkey.id,
                transports: passkey.transports,
            })),
        });
        
        return res.status(200).json({
            socials: [],
            passkey: empty,
        });
    }

    try {
        const socials = await AuthService.getSocialLoginOptions(email);
        //console.log('socials generated:', socials);
        const user_passkeys = await AuthService.findExistingUserPasskeys(user.id);
        //console.log('passkeys found for user:', user_passkeys);
        const pk_options = await generateAuthenticationOptions({
            rpID,
            // Require users to use a previously-registered authenticator
            allowCredentials: user_passkeys.map(passkey => ({
                id: passkey.id,
                transports: passkey.transports,
            })),
        });

        //console.log('authentication options generated:', pk_options);

        await UserService.updateUser(user.id, {passkey_auth_options: pk_options});

        return res.status(200).json({socials, passkey:pk_options});
    } catch(e) {
        //console.log(e)
        return res.status(200).json({});
    }
}


//passkey registration options:
export const getPasskeyRegOptions = async (req, res) => {
    const { email } = req.body;

    //console.log("user passed to getPasskeyRegOptions", email);

    const user = await AuthService.findUserForSignIn(email, "email");
    const passkeys = await AuthService.findExistingUserPasskeys(user.id);

    //console.log({user, passkeys});

    const options = {
        rpName: 'CPIC Tracker',
        rpID,
        userName: email,
        userDisplayName: email,
        timeout: 60000,
        attestationType: 'none',
        excludeCredentials: passkeys.map(passkey => ({
            id: passkey.id,
            type: 'public-key',
            transports: passkey.transports,
        })),
        authenticatorSelection: {
            userVerification: 'required', 
            residentKey: 'required',
        },
        supportedAlgorithmIDs: [-7, -257], //most common algorithms: ES256, and RS256
    };

    const regOptions = await generateRegistrationOptions(options);

    //console.log('registration options generated:', regOptions);

    //add currentChallenge to user in db
    try {
        await UserService.updateUser(user.id, {passkey_reg_options: regOptions})
        return res.json(regOptions);
    } catch(e) {
        next(e)
    }
    
}

export const handlePasskeyRegVerification = async (req, res, next) => {
    const {email, duration, webAuth} = req.body;
   
    //retrieve user object
    let user;
    try {
        user = await AuthService.findUserForSignIn(email, "email");
        await UserService.updateUser(user.id, {passkey_reg_options:null});
    } catch(e) {
        next(e)
    }
    //const user = await AuthService.findUserForSignIn(email, "email");
    //reset users registration options once we have what we need
    //await UserService.updateUser(user.id, {passkey_reg_options:null});

    //parse challenge info for use in verification
    const {passkey_reg_options:currentOptions} = user;
    const expectedChallenge = currentOptions.challenge;

    let verification;
    try {
        verification = await verifyRegistrationResponse({
            response: webAuth,
            expectedChallenge: `${expectedChallenge}`,
            expectedOrigin:origin,
            expectedRPID: rpID,
            requireUserVerification: true,
        });
    } catch (error) {
        next(error)
    }
  
    const { verified, registrationInfo } = verification;

    //console.log("registration verification results:",{ verified, registrationInfo })
  
    if (verified && registrationInfo) {
        
        const {
            credential,
            credentialDeviceType,
            credentialBackedUp,
        } = registrationInfo;

        const binaryPublicKey = ensureUint8Array(credential.publicKey);

        //console.log('pk is in uint8array format: ', binaryPublicKey instanceof Uint8Array);

        const data = {
            id: credential.id,
            user_agent: req.useragent,
            publicKey: binaryPublicKey, 
            counter:credential.counter,
            transports:credential.transports,
            deviceType:credentialDeviceType,
            webAuthn_userId: currentOptions.user.id,
            backedUp: credentialBackedUp,
            userId: user.id,
        };

        try {
            await AuthService.addPasskey(data);
        } catch(e) {
            next(e)
        }
    }
  
    if (duration) {
         const {refreshToken, accessToken} = createJWT(user);

        //send refresh token via httpOnly cookie (not accessible via js)
        res.cookie('jwt_cpic', refreshToken, { 
            ...baseCookieSettings,
            maxAge: duration == "SHORT"
                ? Number(process.env.COOKIE_LIFE_SHORT)
                : Number(process.env.COOKIE_LIFE_LONG)
        })

        return res.json({ verified, accessToken });
    }
        
    return res.json({verified, message: "passkey added"});
    
}

export const verifyAuthResponse = async (req,res, next) => {

    const {email, duration, webAuth} = req.body;

    //console.log('verify auth response inputs:', {email, duration, webAuth})
    let user;
    try {
        user = await AuthService.findUserForSignIn(email, "email");
        await UserService.updateUser(user.id, {passkey_auth_options: null});
    } catch(e) {
        next(e)
    }

    //console.log('user found:', user.id);
    
    const currentOptions = user?.passkey_auth_options;

    //console.log('users currentOptions:', currentOptions)

    let verification;
    let passkey;
    try {
        passkey = await AuthService.getUserPasskey(user.id, webAuth.id);
        const binaryPublicKey = ensureUint8Array(passkey.publicKey);
        verification = await verifyAuthenticationResponse({
            response: webAuth,
            expectedChallenge: currentOptions.challenge,
            expectedOrigin: origin,
            expectedRPID: rpID,
            requireUserVerification:true,
            credential: {
                id: passkey.id,
                publicKey: binaryPublicKey,
                counter: passkey.counter,
                transports: passkey.transports,
            },
        });
    } catch (error) {
        next(error)
    }

    const { verified, authenticationInfo } = verification;
    //console.log('verification results:', verification);
    try {
        const { newCounter } = authenticationInfo;
        await AuthService.savePasskeyCounter(passkey.id, newCounter);
    } catch(error) {
        console.error(error);
        return res.status(400).send({ error: error.message });
    }
    
    //generate access/refresh tokens and return verified status
    const {refreshToken, accessToken} = createJWT(user);

    //send refresh token via httpOnly cookie (not accessible via js)
    res.cookie('jwt_cpic', refreshToken, { 
        ...baseCookieSettings,
        maxAge: duration == "SHORT"
        ? Number(process.env.COOKIE_LIFE_SHORT)
        : Number(process.env.COOKIE_LIFE_LONG)
    })

    return res.json({ verified, accessToken });
}


export const registerNewUser = async (req, res, next) => {
    try {
        const { user, inviteCode, inviteDetails } = req.body;
        const { roleId } = inviteDetails;

        if (!user?.email) throw new AppError("Missing user data", 400)
        if (!roleId) throw new AppError("roleId must be provided", 400)

        if (user.assigned_implementers) {
            user.assigned_implementers = user.assigned_implementers.map(x=>Number(x))
        }

        if (user.implementer_org_id != null && 
            typeof Number(user.implementer_org_id) === 'number'
        ) {
            user.implementer_org_id = Number(user.implementer_org_id);
        } else {
            user.implementer_org_id = null;
        }


        const newUser = await AuthService.register(user, {roleId, inviteCode});
        
        if (!newUser.id) {
            throw new AppError("failed to create user", 500);
        }

        await InviteCodeService.markAsUsed(inviteCode, newUser.id);

        handleResponse(res, 200, "user registeration success", {
            id: newUser.id,
            email:newUser.email,
            display_name: newUser.display_name,
        });

    } catch(e) {
        next(e)
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
    
    res.clearCookie('jwt_cpic', baseCookieSettings);
    return res.json({ message: "cleared cookies"});
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
            
            const validUser = await AuthService.findUserForSignIn(decoded.id);

            if (!validUser) {
                res.clearCookie('jwt_cpic', baseCookieSettings)
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
            
            return res.json({ accessToken })
        }
    );

}


/*
SIGNIN CONTROLLER
*/

export const handleGoogleSignIn = async(req, res, next) => {
    const code = req.query.code;

    const clientDomain = process.env.NODE_ENV === "development" ? `http://localhost:3000` : `https://cpic.dev`;

    const { 
        persist = "SHORT",
        path: { pathname = "/"},
        email,
        isAuthed = false,
    } = JSON.parse(decodeURIComponent(req.query.state));

    const duration = persist;

    if (!code) throw new AppError('google auth code must be provided', 400);

    try {

        const { data } = await AuthService.getGoogleUserData(code);
        const { id, ...properties} = data;

        if (!data) {
            throw new AppError("unable to parse google user data", 400);
        }
        
        const desired_keys = ["email", "given_name", "family_name"];
        
        //generate user object from google identity
        const filteredData = createObjFromFilteredKeys(properties, desired_keys);
        filteredData["profile_pic"] = data.picture;
        filteredData["display_name"] = `${filteredData.given_name} ${filteredData.family_name}`;
        
        const user = await AuthService.findAndUpdateUserWithFederatedId(email,"google", id, data);

        if (!user?.id) {
            throw new AppError("unauthorized user", 401, {inviteCode});
        }

        //issue JWT and authenticate the user IF user isn't adding via profile (already logged in)
        if (isAuthed == false) {
            const userWithRoles = await AuthService.findUserForSignIn(user.id, "id");
            const {refreshToken, accessToken} = createJWT(userWithRoles, duration);
            //send refresh token via httpOnly cookie (not accessible via js)
            res.cookie('jwt_cpic', refreshToken, { 
                ...baseCookieSettings,
                maxAge: duration == "SHORT"
                    ? Number(process.env.COOKIE_LIFE_SHORT)
                    : Number(process.env.COOKIE_LIFE_LONG)
            });
        }

        //redirect back to where they came from
        return res.redirect(303, `${clientDomain}${pathname}`);

    } catch(e) {
        next(e);
    }
}


export const handleSelfSignIn = async (req,res) => {
    const { email, password, duration } = req.body;
    //console.log({email, password, duration})
    
    if (!email || !password) return res.status(400).json({error: 'username and password are required'});

    const validUser = await AuthService.findUserForSignIn(email, "email");
    
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

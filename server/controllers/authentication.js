import { jwtVerify, decodeJwt } from 'jose';
import { redis } from "../index.js";

const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);
import { 
    comparePasswords, 
    createJWT,
    createObjFromFilteredKeys,
    ensureUint8Array,
 } from "../utils/auth.js";
import { handleResponse } from "../utils/defaultResponse.js";
import { AppError } from "../errors/AppError.js";
import { InviteCodeService } from "../services/invites.js";
import { AuthService } from "../services/auth.js";
import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from '@simplewebauthn/server';

// Pre-hashed dummy value for constant-time login responses (bcrypt cost 10).
// Ensures bcrypt.compare always runs, even when the user doesn't exist.
const DUMMY_HASH = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

/**
 * CSRF Protection Strategy:
 *
 * This application relies on the following layered defenses against CSRF:
 * 1. SameSite='Strict' — browser won't send this cookie on cross-site requests.
 * 2. httpOnly=true — cookie cannot be read by client-side JavaScript.
 * 3. secure=true — cookie only sent over HTTPS.
 * 4. CORS whitelist (server/configs/cors.config.js) — only approved origins.
 * 5. Helmet middleware — security headers (X-Content-Type-Options, X-Frame-Options, etc.).
 *
 * A dedicated CSRF token (e.g. csurf) is intentionally omitted because
 * SameSite='Strict' provides equivalent protection in all modern browsers.
 * If SameSite is ever downgraded, add a CSRF token library.
 */
const baseCookieSettings = {
    httpOnly:true,
    sameSite:'Strict',
    secure:true,
    path:'/',
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

        await redis.set(`passkey_auth:${user.id}`, JSON.stringify(pk_options), 'EX', 120);

        return res.status(200).json({socials, passkey:pk_options});
    } catch(e) {
        //console.log(e)
        return res.status(200).json({});
    }
}


//passkey registration options:
export const getPasskeyRegOptions = async (req, res) => {
    const { email } = req.body;
    if (!email) throw new AppError('Email is required', 400);

    const user = await AuthService.findUserForSignIn(email, "email");
    if (!user) throw new AppError('User not found', 404);

    const passkeys = await AuthService.findExistingUserPasskeys(user.id);

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

    try {
        await redis.set(`passkey_reg:${user.id}`, JSON.stringify(regOptions), 'EX', 120);
    } catch {
        throw new AppError('Service temporarily unavailable', 503);
    }
    return res.json(regOptions);
}

export const handlePasskeyRegVerification = async (req, res) => {
    const {email, duration, webAuth} = req.body;

    const user = await AuthService.findUserForSignIn(email, "email");

    let rawRegOptions;
    try {
        rawRegOptions = await redis.get(`passkey_reg:${user.id}`);
        await redis.del(`passkey_reg:${user.id}`);
    } catch {
        throw new AppError('Service temporarily unavailable', 503);
    }
    if (!rawRegOptions) throw new AppError('Registration challenge expired or not found', 400);
    const currentOptions = JSON.parse(rawRegOptions);
    const expectedChallenge = currentOptions.challenge;

    const verification = await verifyRegistrationResponse({
        response: webAuth,
        expectedChallenge: `${expectedChallenge}`,
        expectedOrigin:origin,
        expectedRPID: rpID,
        requireUserVerification: true,
    });

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

        await AuthService.addPasskey(data);
    }

    if (duration) {
         const {refreshToken, accessToken} = await createJWT(user);

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

export const verifyAuthResponse = async (req,res) => {

    const {email, duration, webAuth} = req.body;

    const user = await AuthService.findUserForSignIn(email, "email");

    let rawAuthOptions;
    try {
        rawAuthOptions = await redis.get(`passkey_auth:${user.id}`);
        await redis.del(`passkey_auth:${user.id}`);
    } catch {
        throw new AppError('Service temporarily unavailable', 503);
    }
    if (!rawAuthOptions) throw new AppError('Authentication challenge expired or not found', 400);
    const currentOptions = JSON.parse(rawAuthOptions);

    //console.log('users currentOptions:', currentOptions)

    const passkey = await AuthService.getUserPasskey(user.id, webAuth.id);
    const binaryPublicKey = ensureUint8Array(passkey.publicKey);
    const verification = await verifyAuthenticationResponse({
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

    const { verified, authenticationInfo } = verification;
    //console.log('verification results:', verification);
    const { newCounter } = authenticationInfo;
    await AuthService.savePasskeyCounter(passkey.id, newCounter);

    //generate access/refresh tokens and return verified status
    const {refreshToken, accessToken} = await createJWT(user);

    //send refresh token via httpOnly cookie (not accessible via js)
    res.cookie('jwt_cpic', refreshToken, {
        ...baseCookieSettings,
        maxAge: duration == "SHORT"
        ? Number(process.env.COOKIE_LIFE_SHORT)
        : Number(process.env.COOKIE_LIFE_LONG)
    })

    return res.json({ verified, accessToken });
}


export const registerNewUser = async (req, res) => {
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
    // Best-effort blacklist: if Redis is down, still clear the cookie.
    // The token will expire naturally via its JWT exp claim.
    try {
        const expTime = decodeJwt(token).exp * 1000 - Date.now();
        if (expTime > 0) {
            await redis.set(`token_bl_${token}`, token, 'PX', expTime);
        }
    } catch {
        console.error('Failed to blacklist token during logout (Redis may be unavailable)');
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

    let decoded;
    try {
        ({ payload: decoded } = await jwtVerify(token, refreshSecret));
    } catch (err) {
        res.clearCookie('jwt_cpic', baseCookieSettings)
        return res.status(401).json({message:"forbidden"});
    }

    if (!decoded?.id) {
        res.clearCookie('jwt_cpic', baseCookieSettings)
        return res.status(401).json({message:"forbidden"});
    }

    // Blacklist old token IMMEDIATELY after verification, before any other operations.
    // If subsequent steps fail, user simply needs to log in again.
    const expTime = decoded.exp * 1000 - Date.now();
    if (expTime > 0) {
        try {
            await redis.set(`token_bl_${token}`, token, 'PX', expTime);
        } catch {
            res.clearCookie('jwt_cpic', baseCookieSettings);
            return res.status(503).json({ message: "Service temporarily unavailable" });
        }
    }

    const validUser = await AuthService.findUserForSignIn(decoded.id);

    if (!validUser) {
        res.clearCookie('jwt_cpic', baseCookieSettings)
        return res.status(401).json({ message: "No enabled user"})
    }

    const { duration } = req.body;
    const {refreshToken, accessToken} = await createJWT(validUser, duration);

    //send refresh token via httpOnly cookie (not accessible via js)
    res.cookie('jwt_cpic', refreshToken, {
        ...baseCookieSettings,
        maxAge: duration == "SHORT"
        ? Number(process.env.COOKIE_LIFE_SHORT)
        : Number(process.env.COOKIE_LIFE_LONG)
    });

    return res.json({ accessToken })

}


/*
SIGNIN CONTROLLER
*/

export const handleGoogleSignIn = async(req, res) => {
    const code = req.query.code;

    const clientDomain = process.env.NODE_ENV === "development" ? `http://localhost:3000` : `https://cpic.dev`;

    let stateObj;
    try {
        stateObj = JSON.parse(decodeURIComponent(req.query.state));
    } catch {
        return res.redirect(303, `${clientDomain}/login?message=${encodeURIComponent('Invalid OAuth state')}`);
    }

    const {
        persist = "SHORT",
        path: { pathname = "/"},
        email,
        isAuthed = false,
    } = stateObj;

    const duration = persist;

    if (!code) throw new AppError('google auth code must be provided', 400);

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
        const {refreshToken} = await createJWT(userWithRoles, duration);
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
}


export const handleSelfSignIn = async (req,res) => {
    const { email, password, duration } = req.body;
    //console.log({email, password, duration})
    
    if (!email || !password) return res.status(400).json({error: 'username and password are required'});

    const validUser = await AuthService.findUserForSignIn(email, "email", { includePasswordHash: true });

    // Always run bcrypt.compare to prevent timing side-channel user enumeration.
    const hashToCompare = (validUser?.id && validUser?.password_hash)
        ? validUser.password_hash
        : DUMMY_HASH;
    const match = await comparePasswords(password, hashToCompare);

    if (!validUser?.id || !validUser?.password_hash || !match) return res.sendStatus(409);

    const {refreshToken, accessToken} = await createJWT(validUser, duration);

    //send refresh token via httpOnly cookie (not accessible via js)
    res.cookie('jwt_cpic', refreshToken, {
        ...baseCookieSettings,
        maxAge: duration == "SHORT"
        ? Number(process.env.COOKIE_LIFE_SHORT)
        : Number(process.env.COOKIE_LIFE_LONG)
    })

    res.json({ accessToken });

}

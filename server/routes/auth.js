import { Router } from 'express';
import { 
    handleSelfSignIn,
    handleGoogleSignIn,
    handleLogout,
    handleRefreshToken,
    //verifyGoogleToken,
} from "../controllers/authentication.js";
//import { getAuthedGoogleClient } from '../utils/auth.js'
//import { OAuth2Client } from 'google-auth-library';


const AuthRouter = Router();

AuthRouter.post('/self-sign-in', handleSelfSignIn);
AuthRouter.get('/google-callback/', handleGoogleSignIn);
AuthRouter.post('/logout', handleLogout);

/* UNUSED ROUTES

const clientDomain = process.env.NODE_ENV === "development" ? `http://localhost:3000` : `https://cpic.dev`;
const apiDomain = process.env.NODE_ENV === "development" ? `http://localhost:3500` : `https://api.cpic.dev`;
AuthRouter.post('/verify-google-token', verifyGoogleToken);

AuthRouter.get('/google-url', async function(req, res, next){
    const { persist } = req.query;
    res.header('Access-Control-Allow-Origin', clientDomain);
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const goog_oauth_client = getAuthedGoogleClient();

    const scopes = [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'openid',
    ]

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = goog_oauth_client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      //state: encodeURIComponent(`persist=${persist}`),
      state: encodeURIComponent(JSON.stringify({persist})),
      //'https://www.googleapis.com/auth/userinfo.profile email openid',
      prompt:'consent',
    });

    res.json({url: authorizeUrl});
});
*/

AuthRouter.post('/refresh', handleRefreshToken);

export default AuthRouter;


import { Router } from 'express';
import { 
    handleSelfSignIn,
    handleGoogleSignIn,
    handleLogout,
    handleRefreshToken,
} from "../controllers/authentication.js";
import { OAuth2Client } from 'google-auth-library';


const AuthRouter = Router();

const clientDomain = process.env.NODE_ENV === "development" ? `http://localhost:3000` : `https://cpic.dev`;
const apiDomain = process.env.NODE_ENV === "development" ? `http://localhost:3500` : `https://cpic-tracker-api.onrender.com`;

AuthRouter.post('/self-sign-in', handleSelfSignIn);
AuthRouter.get('/google-callback/', handleGoogleSignIn);
AuthRouter.post('/logout', handleLogout);

AuthRouter.get('/google-url', async function(req, res, next){
    const { persist } = req.query;
    res.header('Access-Control-Allow-Origin', clientDomain);
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectURL = `${apiDomain}/api/auth/google-callback/`;

    const goog_oauth_client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri:redirectURL
    });

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

AuthRouter.post('/refresh', handleRefreshToken);

export default AuthRouter;


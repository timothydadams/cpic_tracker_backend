import { Router } from 'express';
import { 
    handleSelfSignIn,
    handleGoogleSignIn,
    handleLogout,
    handleRefreshToken,
} from "../controllers/authentication.js";
import { OAuth2Client } from 'google-auth-library';


const AuthRouter = Router();

AuthRouter.post('/self-sign-in', handleSelfSignIn);
AuthRouter.get('/google-callback/', handleGoogleSignIn);
AuthRouter.post('/logout', handleLogout);

AuthRouter.get('/google-url', async function(req, res, next){
    const { persist } = req.query;
    res.header('Access-Control-Allow-Origin', `http://localhost:3000`);
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');

    const redirectURL = `http://localhost:3500/api/auth/google-callback/`;

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

//app.use('/api', [protect], apiRouter)
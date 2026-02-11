import 'dotenv/config';

// --- JWT Secret Validation ---
const SAMPLE_SECRETS = [
    'abcd',
    'CHANGE_ME_access_run_require_crypto_randomBytes_64_toString_hex',
    'CHANGE_ME_refresh_run_require_crypto_randomBytes_64_toString_hex',
];

(function validateJwtSecrets() {
    const access = process.env.JWT_ACCESS_SECRET;
    const refresh = process.env.JWT_REFRESH_SECRET;
    const problems = [];

    if (!access || !refresh) {
        problems.push('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must both be set.');
    }
    if (access && refresh && access === refresh) {
        problems.push('JWT_ACCESS_SECRET and JWT_REFRESH_SECRET must be different.');
    }
    if (SAMPLE_SECRETS.includes(access)) {
        problems.push('JWT_ACCESS_SECRET is still set to a sample/placeholder value.');
    }
    if (SAMPLE_SECRETS.includes(refresh)) {
        problems.push('JWT_REFRESH_SECRET is still set to a sample/placeholder value.');
    }

    if (problems.length > 0) {
        const msg = `JWT SECRET CONFIGURATION ERROR:\n  - ${problems.join('\n  - ')}`;
        if (process.env.NODE_ENV === 'production') {
            console.error(`FATAL: ${msg}`);
            process.exit(1);
        } else if (process.env.NODE_ENV !== 'test') {
            console.warn(`WARNING: ${msg}`);
        }
    }
})();
// --- End JWT Secret Validation ---

import { Server } from "socket.io";
import { createServer } from "http";
import { jwtVerify } from 'jose';
import {expressApp} from "./express.js";
import { whitelist } from './configs/cors.config.js';
import Redis from 'ioredis';

const socketSecret = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET);

const port = process.env.PORT || 3500;

const httpServer = createServer(expressApp);

const redisUrl = process.env.NODE_ENV == "development" ? "redis://127.0.0.1:6379" : process.env.REDIS_SERVICE_URL;

export const redis = new Redis(redisUrl);

httpServer.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

const io = new Server(httpServer, {
    cors: {
        origin: whitelist,
    },
});


io.use(async (socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication required'));
    try {
        const { payload } = await jwtVerify(token, socketSecret);
        socket.data.user = payload;
        next();
    } catch {
        next(new Error('Invalid token'));
    }
});

io.on('connection', socket => {
    const userId = socket.data.user.id;
    console.log(`user ${userId} connected`);
    //use socket to target user that just connected
    socket.emit('message', "welcome to cpic.dev");
    //all users except this new user
    socket.broadcast.emit('message',`User ${userId} connected`)

    //listening for events
    socket.on('message', data => {
        console.log(data);
        io.emit('message', `${userId}: ${data}`)
    })

    //when user disconnects - to all others
    socket.on("disconnect", () => {
        socket.broadcast.emit('message',`User ${userId} has disconnected`)
    });

    socket.on('activity', (name) => {
        socket.broadcast.emit('activity', name)
    })
});


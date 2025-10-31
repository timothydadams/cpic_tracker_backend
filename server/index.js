import { Server } from "socket.io";
import { createServer } from "http";
import http2 from 'http2';
import {expressApp} from "./express.js";
import * as dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const port = process.env.PORT || 3500;



const httpServer = process.env.NODE_ENV === "development" 
    ? createServer(expressApp)
    : http2.createSecureServer({},expressApp);

const redisUrl = process.env.NODE_ENV == "development" ? "redis://127.0.0.1:6379" : process.env.REDIS_SERVICE_URL;

export const redis = new Redis(redisUrl);

httpServer.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});

const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" 
            ? false 
            : [
               'http://127.0.0.1:3000',
                'http://localhost:3000' 
            ]
    },
});


io.on('connection', socket => {
    const userId = socket?.request?.user?.id || socket.id.substring(0,5);
    console.log(`user ${userId} connected`);
    //use socket to target user that just connected
    socket.emit('message', "welcome to droneops");
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


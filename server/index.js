import { Server } from "socket.io";
import { createServer } from "http";
import {expressApp} from "./express.js";
import * as dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

const port = process.env.PORT || 3500;
const httpServer = createServer(expressApp);
export const redis = new Redis({port:6379, host:'127.0.0.1'});

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


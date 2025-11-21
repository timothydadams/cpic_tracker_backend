import express from "express";
import morgan from "morgan";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { corsOptionsDelegate } from "./configs/cors.config.js";
import {dirname, join} from 'path';
import { fileURLToPath } from 'url';
import AppRouter from "./routes/index.js";
import { errorHandler } from "./middleware/handleErrors.js";
import { userContextMiddleware } from "./middleware/prisma-als-middleware.js";
import { express as useragent } from 'express-useragent';

/* Needed to support ES6 module instead of CommonJS */
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(useragent());
app.use(morgan('common'));
app.use(helmet());
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static(join(__dirname, '../public')));

// Middleware to set user context using AsyncLocalStorage (used with prisma PII extension)
app.use(userContextMiddleware);

app.use('/api', AppRouter);

//Error handling
app.use(errorHandler)

// Catch-all route to serve index.html for any other requests (e.g., for client-side routing)
// This should be placed AFTER all API routes
app.get('/*splat', (req, res) => {
   res.sendFile(join(__dirname, '../public', 'index.html'));
});

export const expressApp = app;

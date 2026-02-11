import { AppError } from '../errors/AppError.js';
import { Prisma } from '../../prisma/generated/prisma/index.js';

const { PrismaClientKnownRequestError, PrismaClientValidationError } = Prisma

const isDev = process.env.NODE_ENV === "development";
const clientDomain = isDev ? `http://localhost:3000` : `https://cpic.dev`;

export const errorHandler = (err,req,res,next) => {
  // Default error
  let statusCode = 500;
  let message = 'Internal server error';
  let data = err.data ?? {};

  const isGoogleAuthHandler = req.path === "/api/auth/google-callback/";

  // Handle custom AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    data = err.data
  }

  if (isGoogleAuthHandler) {
    const { inviteCode } = data;
    const queryString = new URLSearchParams({message}).toString();
    if (inviteCode) {
        return res.redirect(`${clientDomain}/register/${inviteCode}?${queryString}`);
    } else {
        return res.redirect(`${clientDomain}/login?${queryString}`);
    }
  }

  // Handle Prisma errors
  else if (err instanceof PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        // Unique constraint violation
        statusCode = 409;
        message = 'A record with this value already exists';
        break;
      case 'P2025':
        // Record not found
        statusCode = 404;
        message = 'Record not found';
        break;
      case 'P2003':
        // Foreign key constraint failed
        statusCode = 400;
        message = 'Invalid reference to related record';
        break;
      default:
        statusCode = 400;
        message = 'Database operation failed';
    }
  }

  // Handle Prisma validation errors
  else if (err instanceof PrismaClientValidationError) {
    statusCode = 400;
    message = 'Invalid data provided';
  }

  // Log error for debugging (in production, use a proper logger)
  if (isDev) {
    console.error('Error:', err);
  }

  // Send error response
  return res.status(statusCode).json({
    status: 'error',
    message,
    ...(isDev ? { stack: err.stack } : {}),
  });
};
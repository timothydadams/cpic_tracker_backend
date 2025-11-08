export class AppError extends Error {
  statusCode;
  isOperational;
  
  constructor(message, statusCode, data={}) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.data = data;
    this.name = "AppError";
    Error.captureStackTrace(this, this.constructor);
  }
}
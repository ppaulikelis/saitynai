import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../models/entities/customError';

export function invalidPath(request: Request, response: Response) {
  const status = 404;
  response.status(status).json({
    status,
    message: 'Api route not found',
  });
}

export function errorLogger(error: CustomError, request: Request, response: Response, next: NextFunction) {
  if (error.message !== '') console.log(error.message);
  next(error);
}

export function errorResponder(error: CustomError, request: Request, response: Response, next: NextFunction) {
  const status = error.status || 500;
  const shortMsg = error.shortMsg || 'Something went wrong';
  response.status(status).json({
    status,
    message: shortMsg,
    fullMessage: error.message,
  });
}

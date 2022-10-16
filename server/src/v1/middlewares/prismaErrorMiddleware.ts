import { Prisma } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { resourceNotFound, CustomError, invalidRequest, invalidData } from '../models/entities/customError';

export function prismaErrorHandler(error: any, request: Request, response: Response, next: NextFunction) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.log('PrismaClientKnownRequestError');
    console.log(error.code);
    if (error.code === 'P2025') {
      next(resourceNotFound);
    }
    if (error.code === 'P2002') {
      next(invalidData);
    } else {
      next(new CustomError(error.message));
    }
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    console.log('PrismaClientUnknownRequestError');
    next(new CustomError(error.message));
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    console.log('PrismaClientRustPanicError');
    next(new CustomError(error.message));
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    console.log('PrismaClientInitializationError');
    next(new CustomError(error.message));
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    console.log('PrismaClientValidationError');
    next(invalidRequest);
  } else {
    next(error);
  }
}

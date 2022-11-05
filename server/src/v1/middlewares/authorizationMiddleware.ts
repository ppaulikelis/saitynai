import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthToken } from '../models/entities/authToken';
import { invalidAuthToken, invalidUserRole, noAuthHeader } from '../models/entities/customError';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];
  if (token == null) {
    next(noAuthHeader);
    return;
  }
  jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err, user) => {
    if (err) {
      next(invalidAuthToken);
      return;
    }
    req.authToken = user as AuthToken;
    next();
  });
}

export function checkUserRole(authToken: AuthToken, role: string) {
  return authToken.role === role;
}

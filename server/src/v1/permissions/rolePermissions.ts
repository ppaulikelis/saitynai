import { NextFunction } from 'express';
import { AuthToken } from '../models/entities/authToken';
import { invalidUserRole } from '../models/entities/customError';

export function checkUserRole(authToken: AuthToken, role: string, next: NextFunction) {
  if (authToken.role !== role) {
    next(invalidUserRole);
    return false;
  }
  return true;
}

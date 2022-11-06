import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { checkUserRole } from './rolePermissions';

export function canGetEditor(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.ADMIN, next)) return;
  next();
}

export function canPostEditor(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.ADMIN, next)) return;
  next();
}

export async function canRemoveEditor(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.ADMIN, next)) return;
  next();
}

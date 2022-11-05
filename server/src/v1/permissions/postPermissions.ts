import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { checkUserRole } from './rolePermissions';

export function canGetPost(req: Request, res: Response, next: NextFunction) {
  next();
}

export function canPostPost(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.EDITOR, next)) return;
  next();
}

export async function canUpdatePost(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.EDITOR, next)) return;
  next();
}

export async function canRemovePost(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.EDITOR, next)) return;
  next();
}

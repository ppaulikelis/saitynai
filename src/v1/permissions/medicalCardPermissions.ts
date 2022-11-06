import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { resourceNotFound } from '../models/entities/customError';
import { getMedicalCard } from '../services/medicalCardService';
import { checkUserRole } from './rolePermissions';

export function canGetMedicalCard(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  next();
}

export function canPostMedicalCard(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  next();
}

export async function canUpdateMedicalCard(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  if (!(await getMedicalCard(Number(req.params.medicalCardId), req.authToken.id))) {
    next(resourceNotFound);
    return;
  }
  next();
}

export async function canRemoveMedicalCard(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  if (!(await getMedicalCard(Number(req.params.medicalCardId), req.authToken.id))) {
    next(resourceNotFound);
    return;
  }
  next();
}

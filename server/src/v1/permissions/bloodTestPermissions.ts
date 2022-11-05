import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { resourceNotFound } from '../models/entities/customError';
import { getBloodTest } from '../services/bloodTestService';
import { getMedicalCard } from '../services/medicalCardService';
import { checkUserRole } from './rolePermissions';

export function canGetBloodTest(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  next();
}

export async function canPostBloodTest(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  if (!(await getMedicalCard(Number(req.params.medicalCardId), req.authToken.id))) {
    next(resourceNotFound);
    return;
  }
  next();
}

export async function canUpdateBloodTest(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  if (!(await getBloodTest(Number(req.params.bloodTestId), Number(req.params.medicalCardId), req.authToken.id))) {
    next(resourceNotFound);
    return;
  }
  next();
}

export async function canRemoveBloodTest(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  if (!(await getBloodTest(Number(req.params.bloodTestId), Number(req.params.medicalCardId), req.authToken.id))) {
    next(resourceNotFound);
    return;
  }
  next();
}

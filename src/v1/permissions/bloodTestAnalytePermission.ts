import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { resourceNotFound } from '../models/entities/customError';
import { getBloodTestAnalyte } from '../services/bloodTestAnalyteService';
import { getBloodTest } from '../services/bloodTestService';
import { getMedicalCard } from '../services/medicalCardService';
import { checkUserRole } from './rolePermissions';

export function canGetBloodTestAnalyte(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  next();
}

export async function canPostBloodTestAnalyte(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  if (!(await getBloodTest(Number(req.params.bloodTestId), Number(req.params.medicalCardId), req.authToken.id))) {
    next(resourceNotFound);
    return;
  }
  next();
}

export async function canUpdateBloodTestAnalyte(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  if (
    !(await getBloodTestAnalyte(
      Number(req.params.bloodTestAnalyteId),
      Number(req.params.bloodTestId),
      Number(req.params.medicalCardId),
      req.authToken.id
    ))
  ) {
    next(resourceNotFound);
    return;
  }
  next();
}

export async function canRemoveBloodTestAnalyte(req: Request, res: Response, next: NextFunction) {
  if (!checkUserRole(req.authToken, Role.USER, next)) return;
  if (
    !(await getBloodTestAnalyte(
      Number(req.params.bloodTestAnalyteId),
      Number(req.params.bloodTestId),
      Number(req.params.medicalCardId),
      req.authToken.id
    ))
  ) {
    next(resourceNotFound);
    return;
  }
  next();
}

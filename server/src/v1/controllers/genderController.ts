import { NextFunction, Request, Response } from 'express';
import { resourceNotFound } from '../models/entities/customError';
import { getGenders } from '../services/genderService';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const genders = await getGenders();
    if (genders.length == 0) {
      next(resourceNotFound);
    } else {
      res.status(200).json(genders);
    }
  } catch (error: any) {
    next(error);
  }
}

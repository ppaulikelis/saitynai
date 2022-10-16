import { NextFunction, Request, Response } from 'express';
import { resourceNotFound } from '../models/entities/customError';
import { getBloodTestAnalyteDescriptions } from '../services/btaDescriptionService';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const bloodTestAnalyteDescriptions = await getBloodTestAnalyteDescriptions();
    if (bloodTestAnalyteDescriptions.length == 0) {
      next(resourceNotFound);
    } else {
      res.status(200).json(bloodTestAnalyteDescriptions);
    }
  } catch (error: any) {
    next(error);
  }
}

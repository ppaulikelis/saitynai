import { NextFunction, Request, Response } from 'express';
import { resourcesNotFound, resourceNotFound } from '../models/entities/customError';
import {
  deleteBloodTestAnalyte,
  getBloodTestAnalyte,
  getBloodTestAnalytes,
  postBloodTestAnalyte,
  updateBloodTestAnalyte,
} from '../services/bloodTestAnalyteService';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const bloodTestAnalytes = await getBloodTestAnalytes(
      Number(req.query.page),
      Number(req.query.count),
      Number(req.params.bloodTestId),
      Number(req.params.medicalCardId),
      req.authToken.id
    );
    if (bloodTestAnalytes.length == 0) {
      next(resourcesNotFound);
    } else {
      res.status(200).json(bloodTestAnalytes);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const bloodTestAnalyte = await postBloodTestAnalyte({ ...req.body, bloodTestId: Number(req.params.bloodTestId) });
    res.status(201).json(bloodTestAnalyte);
  } catch (error: any) {
    next(error);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const bloodTestAnalyte = await getBloodTestAnalyte(
      Number(req.params.bloodTestAnalyteId),
      Number(req.params.bloodTestId),
      Number(req.params.medicalCardId),
      req.authToken.id
    );
    if (bloodTestAnalyte == null) {
      next(resourceNotFound);
    } else {
      res.status(200).json(bloodTestAnalyte);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const bloodTestAnalyte = await updateBloodTestAnalyte(Number(req.params.bloodTestAnalyteId), req.body);
    res.status(200).json(bloodTestAnalyte);
  } catch (error: any) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteBloodTestAnalyte(Number(req.params.bloodTestAnalyteId));
    res.status(204).json();
  } catch (error: any) {
    next(error);
  }
}

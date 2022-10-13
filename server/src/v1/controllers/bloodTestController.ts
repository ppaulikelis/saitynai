import { NextFunction, Request, Response } from 'express';
import { resourcesNotFound, resourceNotFound } from '../models/entities/customError';
import {
  deleteBloodTest,
  getBloodTest,
  getBloodTests,
  postBloodTest,
  updateBloodTest,
} from '../services/bloodTestService';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const bloodTests = await getBloodTests(
      Number(req.query.page),
      Number(req.query.count),
      Number(req.params.medicalCardId),
      1
    ); //TODO: pass user id instead of 1
    if (bloodTests.length == 0) {
      next(resourcesNotFound);
    } else {
      res.status(200).json(bloodTests);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const bloodTest = await postBloodTest({ ...req.body, medicalCardId: Number(req.params.medicalCardId) }); //TODO: pass user id instead of 1
    res.status(201).json(bloodTest);
  } catch (error: any) {
    next(error);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const bloodTest = await getBloodTest(Number(req.params.bloodTestId), Number(req.params.medicalCardId), 1); //TODO: pass user id instead of 1
    if (bloodTest == null) {
      next(resourceNotFound);
    } else {
      res.status(200).json(bloodTest);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const bloodTest = await updateBloodTest(Number(req.params.bloodTestId), req.body);
    res.status(200).json(bloodTest);
  } catch (error: any) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteBloodTest(Number(req.params.bloodTestId));
    res.status(204).json();
  } catch (error: any) {
    next(error);
  }
}

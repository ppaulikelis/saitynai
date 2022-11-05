import { NextFunction, Request, Response } from 'express';
import { resourcesNotFound, resourceNotFound } from '../models/entities/customError';
import {
  deleteMedicalCard,
  getMedicalCard,
  getMedicalCards,
  postMedicalCard,
  updateMedicalCard,
} from '../services/medicalCardService';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const medicalCards = await getMedicalCards(Number(req.query.page), Number(req.query.count), req.authToken.id);
    if (medicalCards.length == 0) {
      next(resourcesNotFound);
    } else {
      res.status(200).json(medicalCards);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const medicalCard = await postMedicalCard({ ...req.body, userId: req.authToken.id });
    res.status(201).json(medicalCard);
  } catch (error: any) {
    next(error);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const medicalCard = await getMedicalCard(Number(req.params.medicalCardId), req.authToken.id);
    if (medicalCard == null) {
      next(resourceNotFound);
    } else {
      res.status(200).json(medicalCard);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const medicalCard = await updateMedicalCard(Number(req.params.medicalCardId), req.body);
    res.status(200).json(medicalCard);
  } catch (error: any) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteMedicalCard(Number(req.params.medicalCardId));
    res.status(204).json();
  } catch (error: any) {
    next(error);
  }
}

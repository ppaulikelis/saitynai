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
    const medicalCards = await getMedicalCards(Number(req.query.page), Number(req.query.count), 1); //TODO: pass user id instead of 1
    if (medicalCards.length == 0) {
      next(resourcesNotFound);
    } else {
      res.status(200).json(medicalCards);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function postOne(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.body;
    const medicalCard = await postMedicalCard({ ...data, userId: 1 }); //TODO: pass user id instead of 1
    res.status(201).json(medicalCard);
  } catch (error: any) {
    next(error);
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { medicalCardId } = req.params;
    const medicalCard = await getMedicalCard(Number(medicalCardId), 1); //TODO: pass user id instead of 1
    if (medicalCard == null) {
      next(resourceNotFound);
    } else {
      res.status(200).json(medicalCard);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function updateOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { medicalCardId } = req.params;
    const data = req.body;
    const medicalCard = await updateMedicalCard(Number(medicalCardId), data);
    res.status(200).json(medicalCard);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { medicalCardId } = req.params;
    await deleteMedicalCard(Number(medicalCardId));
    res.status(204).json();
  } catch (error: any) {
    next(error);
  }
}

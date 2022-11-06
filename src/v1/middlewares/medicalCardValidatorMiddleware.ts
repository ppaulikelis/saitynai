import e, { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { invalidData } from '../models/entities/customError';

const schemaPost = Joi.object({
  name: Joi.string().min(1).max(35).required(),
  surname: Joi.string().min(1).max(35),
  genderId: Joi.number().min(1).max(2).required(),
  birthDate: Joi.date().less(new Date()).required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string().min(1).max(35),
  surname: Joi.string().min(1).max(35),
  genderId: Joi.number().min(1).max(2),
  birthDate: Joi.date().less(new Date()),
});

export function validatePost(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const { error } = schemaPost.validate(data, { abortEarly: true });
  if (error) {
    next(invalidData);
  } else {
    next();
  }
}

export function validateUpdate(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const { error } = schemaUpdate.validate(data, { abortEarly: true });
  if (error) {
    next(invalidData);
  } else {
    next();
  }
}

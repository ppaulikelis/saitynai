import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { invalidData } from '../models/entities/customError';

const schema = Joi.object({
  date: Joi.date().less(new Date().setDate(new Date().getDate() + 1)),
});

export function validate(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const { error } = schema.validate(data, { abortEarly: true });
  if (error) {
    next(invalidData);
  } else {
    next();
  }
}

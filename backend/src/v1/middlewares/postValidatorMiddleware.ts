import e, { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { invalidData } from '../models/entities/customError';

const schemaPost = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().min(1).max(100).required(),
  content: Joi.string().min(1).max(3000).required(),
});

const schemaUpdate = Joi.object({
  title: Joi.string().min(1).max(100),
  description: Joi.string().min(1).max(100),
  content: Joi.string().min(1).max(3000),
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
  console.log(data);
  const { error } = schemaUpdate.validate(data, { abortEarly: true });
  if (error) {
    console.log(error);
    next(invalidData);
  } else {
    next();
  }
}

import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { invalidCredentials, invalidData } from '../models/entities/customError';

const prisma = new PrismaClient();

const schema = () => {
  const schema1 = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*,-]).{8,20}$/)
      .required()
      .min(8)
      .max(20),
  });
  return schema1;
};

export async function validate(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const newSchema = schema();
  const { error } = await newSchema.validate(data, { abortEarly: true });
  if (error) {
    next(invalidCredentials);
  } else {
    next();
  }
}

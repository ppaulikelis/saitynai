import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { invalidData } from '../models/entities/customError';

const prisma = new PrismaClient();

const schemaPost = async () => {
  const last = await prisma.bloodTestAnalyteDescription.findMany({
    take: -1,
  });
  const max = last[0].id;
  const schema = Joi.object({
    value: Joi.number().required(),
    bloodTestAnalyteDescriptionId: Joi.number().min(1).max(max),
  });
  return schema;
};

const schemaUpdate = async () => {
  const last = await prisma.bloodTestAnalyteDescription.findMany({
    take: -1,
  });
  const max = last[0].id;
  const schema = Joi.object({
    value: Joi.number(),
  });
  return schema;
};

export async function validatePost(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const schema = await schemaPost();
  const { error } = await schema.validate(data, { abortEarly: true });
  if (error) {
    next(invalidData);
  } else {
    next();
  }
}

export async function validateUpdate(req: Request, res: Response, next: NextFunction) {
  const data = req.body;
  const schema = await schemaUpdate();
  const { error } = await schema.validate(data, { abortEarly: true });
  if (error) {
    next(invalidData);
  } else {
    next();
  }
}

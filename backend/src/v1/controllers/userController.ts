import { NextFunction, Request, Response } from 'express';
import { resourceNotFound } from '../models/entities/customError';
import { getUser } from '../services/userService';

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await getUser('', req.authToken.id);
    if (user == null) {
      next(resourceNotFound);
    } else {
      res.status(200).json({ id: user.id, email: user.email, role: user.role });
    }
  } catch (error: any) {
    next(error);
  }
}

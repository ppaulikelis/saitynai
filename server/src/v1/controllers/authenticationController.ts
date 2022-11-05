import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getUser, postUser } from '../services/userService';
import { invalidCredentials } from '../models/entities/customError';

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const user = await postUser({ email, password: encryptedPassword });
    res.status(201).json({ email: user.email });
  } catch (error: any) {
    next(error);
  }
}

export async function signin(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await getUser(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const data = { id: user.id, role: user.role };
        const accessToken = jwt.sign(data, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: 60 * 10 });
        res.status(200).json({ accessToken });
      } else {
        next(invalidCredentials);
      }
    } else {
      next(invalidCredentials);
    }
  } catch (error: any) {
    next(error);
  }
}

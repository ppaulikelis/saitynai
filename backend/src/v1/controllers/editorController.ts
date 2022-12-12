import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { deleteUser, getUsers, postUser } from '../services/userService';
import { resourcesNotFound } from '../models/entities/customError';
import { NextFunction, Request, Response } from 'express';
import { Role } from '@prisma/client';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const editors = await getUsers(Role.EDITOR);
    if (editors.length == 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(editors);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const editor = await postUser({ email, password: encryptedPassword, role: Role.EDITOR });
    res.status(201).json({ email: editor.email });
  } catch (error: any) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteUser(Number(req.params.editorId));
    res.status(204).json();
  } catch (error: any) {
    next(error);
  }
}

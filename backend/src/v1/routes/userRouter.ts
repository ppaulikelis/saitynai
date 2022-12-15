import express from 'express';
import { get } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authorizationMiddleware';
export const router = express.Router();

router.route('/user/me').get(authenticateToken, get);

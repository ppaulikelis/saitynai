import express, { Router } from 'express';
import { remove, getAll, get, post, update } from '../controllers/medicalCardController';
import { validatePost, validateUpdate } from '../middlewares/medicalCardValidatorMiddleware';

export const router = express.Router();

router.route('/medical-cards').get(getAll).post(validatePost, post);
router.route('/medical-cards/:medicalCardId').get(get).put(validateUpdate, update).delete(remove);

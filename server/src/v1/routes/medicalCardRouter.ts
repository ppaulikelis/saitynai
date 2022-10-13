import express, { Router } from 'express';
import { deleteOne, getAll, getOne, postOne, updateOne } from '../controllers/medicalCardController';
import { validatePost, validateUpdate } from '../middlewares/medicalCardValidatorMiddleware';

export const router = express.Router();

router.route('/medical-cards').get(getAll).post(validatePost, postOne);
router.route('/medical-cards/:medicalCardId').get(getOne).put(validateUpdate, updateOne).delete(deleteOne);

import express, { Router } from 'express';
import { remove, getAll, get, post, update } from '../controllers/bloodTestController';
import { validate } from '../middlewares/bloodTestValidatorMiddleware';

export const router = express.Router();

router.route('/medical-cards/:medicalCardId/blood-tests').get(getAll).post(validate, post);
router.route('/medical-cards/:medicalCardId/blood-tests/:bloodTestId').get(get).put(validate, update).delete(remove);

import express, { Router } from 'express';
import { remove, getAll, get, post, update } from '../controllers/bloodTestController';
import { authenticateToken } from '../middlewares/authorizationMiddleware';
import { validate } from '../middlewares/bloodTestValidatorMiddleware';
import {
  canGetBloodTest,
  canPostBloodTest,
  canRemoveBloodTest,
  canUpdateBloodTest,
} from '../permissions/bloodTestPermissions';

export const router = express.Router();

router
  .route('/medical-cards/:medicalCardId/blood-tests')
  .all(authenticateToken)
  .get(canGetBloodTest, getAll)
  .post(canPostBloodTest, validate, post);
router
  .route('/medical-cards/:medicalCardId/blood-tests/:bloodTestId')
  .all(authenticateToken)
  .get(canGetBloodTest, get)
  .put(canUpdateBloodTest, validate, update)
  .delete(canRemoveBloodTest, remove);

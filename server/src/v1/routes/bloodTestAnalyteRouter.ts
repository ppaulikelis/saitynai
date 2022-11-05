import express from 'express';
import { get, getAll, post, remove, update } from '../controllers/bloodTestAnalyteController';
import { authenticateToken } from '../middlewares/authorizationMiddleware';
import { validatePost, validateUpdate } from '../middlewares/bloodTestAnalyteValidatorMiddleware';
import {
  canGetBloodTestAnalyte,
  canPostBloodTestAnalyte,
  canRemoveBloodTestAnalyte,
  canUpdateBloodTestAnalyte,
} from '../permissions/bloodTestAnalytePermission';

export const router = express.Router();

router
  .route('/medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes')
  .all(authenticateToken)
  .get(canGetBloodTestAnalyte, getAll)
  .post(canPostBloodTestAnalyte, validatePost, post);
router
  .route('/medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes/:bloodTestAnalyteId')
  .all(authenticateToken)
  .get(canGetBloodTestAnalyte, get)
  .put(canUpdateBloodTestAnalyte, validateUpdate, update)
  .delete(canRemoveBloodTestAnalyte, remove);

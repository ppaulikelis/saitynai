import express, { Router } from 'express';
import { remove, getAll, get, post, update } from '../controllers/medicalCardController';
import { authenticateToken } from '../middlewares/authorizationMiddleware';
import { validatePost, validateUpdate } from '../middlewares/medicalCardValidatorMiddleware';
import {
  canGetMedicalCard,
  canPostMedicalCard,
  canRemoveMedicalCard,
  canUpdateMedicalCard,
} from '../permissions/medicalCardPermissions';

export const router = express.Router();

router
  .route('/medical-cards')
  .all(authenticateToken)
  .get(canGetMedicalCard, getAll)
  .post(canPostMedicalCard, validatePost, post);
router
  .route('/medical-cards/:medicalCardId')
  .all(authenticateToken)
  .get(canGetMedicalCard, get)
  .put(canUpdateMedicalCard, validateUpdate, update)
  .delete(canRemoveMedicalCard, remove);

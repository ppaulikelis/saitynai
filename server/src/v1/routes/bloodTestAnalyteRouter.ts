import express from 'express';
import { get, getAll, post, remove, update } from '../controllers/bloodTestAnalyteController';
import { validatePost, validateUpdate } from '../middlewares/bloodTestAnalyteValidator';

export const router = express.Router();

router
  .route('/medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes')
  .get(getAll)
  .post(validatePost, post);
router
  .route('/medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes/:bloodTestAnalyteId')
  .get(get)
  .put(validateUpdate, update)
  .delete(remove);

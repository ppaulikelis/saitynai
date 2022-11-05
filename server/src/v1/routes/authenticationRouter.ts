import express from 'express';
import { signin, signup } from '../controllers/authenticationController';
import { validate } from '../middlewares/authenticationValidatorMiddleware';

export const router = express.Router();

router.route('/signin').post(validate, signin);
router.route('/signup').post(validate, signup);

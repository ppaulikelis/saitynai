import express from 'express';
import { getAll } from '../controllers/genderController';

export const router = express.Router();

router.route('/genders').get(getAll);

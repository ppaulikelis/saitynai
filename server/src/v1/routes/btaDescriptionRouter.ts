import express from 'express';
import { getAll } from '../controllers/btaDescriptionController';

export const router = express.Router();

router.route('/blood-test-analyte-descriptions').get(getAll);

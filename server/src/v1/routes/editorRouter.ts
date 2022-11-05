import express from 'express';
import { getAll, post, remove } from '../controllers/editorController';
import { validate } from '../middlewares/authenticationValidatorMiddleware';
import { authenticateToken } from '../middlewares/authorizationMiddleware';
import { canGetEditor, canPostEditor, canRemoveEditor } from '../permissions/editorPermissions';

export const router = express.Router();

router.route('/editors').all(authenticateToken).get(canGetEditor, getAll).post(canPostEditor, validate, post);
router.route('/editors/:editorId').all(authenticateToken).delete(canRemoveEditor, remove);

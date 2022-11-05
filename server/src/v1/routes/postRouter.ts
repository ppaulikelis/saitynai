import express from 'express';
import { remove, getAll, get, post, update } from '../controllers/postController';
import { authenticateToken } from '../middlewares/authorizationMiddleware';
import { validatePost, validateUpdate } from '../middlewares/postValidatorMiddleware';
import { canPostPost, canRemovePost, canUpdatePost } from '../permissions/postPermissions';
export const router = express.Router();

router.route('/posts').get(getAll).post(authenticateToken, canPostPost, validatePost, post);
router
  .route('/posts/:postId')
  .get(get)
  .put(authenticateToken, canUpdatePost, validateUpdate, update)
  .delete(authenticateToken, canRemovePost, remove);

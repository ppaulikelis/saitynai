import express from 'express';
import { remove, getAll, get, post, update } from '../controllers/postController';
import { validatePost, validateUpdate } from '../middlewares/postValidatorMiddleware';
export const router = express.Router();

router.route('/posts').get(getAll).post(validatePost, post);
router.route('/posts/:postId').get(get).put(validateUpdate, update).delete(remove);

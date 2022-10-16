import { NextFunction, Request, Response } from 'express';
import { resourcesNotFound, resourceNotFound } from '../models/entities/customError';
import { deletePost, getPost, getPosts, postPost, updatePost } from '../services/postService';

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await getPosts(Number(req.query.page), Number(req.query.count));
    if (posts.length == 0) {
      next(resourcesNotFound);
    } else {
      res.status(200).json(posts);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function post(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await postPost({ ...req.body, editorId: 3, lastEditorId: 3 }); //TODO: pass editor id instead of 3
    res.status(201).json(post);
  } catch (error: any) {
    next(error);
  }
}

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await getPost(Number(req.params.postId));
    if (post == null) {
      next(resourceNotFound);
    } else {
      res.status(200).json(post);
    }
  } catch (error: any) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const post = await updatePost(Number(req.params.postId), { ...req.body, lastEditorId: 3 }); //TODO: pass editor id instead of 3
    res.status(200).json(post);
  } catch (error: any) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    await deletePost(Number(req.params.postId));
    res.status(204).json();
  } catch (error: any) {
    next(error);
  }
}

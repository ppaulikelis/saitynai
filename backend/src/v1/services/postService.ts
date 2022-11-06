import { Post, PrismaClient } from '@prisma/client';
import { handleListQuery } from '../utils/listQueryHandler';
const prisma = new PrismaClient();

export async function getPosts(page: number, count: number) {
  const { skip, take } = handleListQuery(page, count);
  const posts = await prisma.post.findMany({
    skip: skip,
    take: take,
  });
  return posts;
}

export async function postPost(data: Post) {
  const post = await prisma.post.create({
    data: data,
  });
  return post;
}

export async function getPost(id: number) {
  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });
  return post;
}

export async function updatePost(id: number, data: Post) {
  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: data,
  });
  return post;
}

export async function deletePost(id: number) {
  await prisma.post.delete({
    where: {
      id: id,
    },
  });
}

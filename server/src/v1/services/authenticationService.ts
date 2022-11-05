import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();
export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

export async function postUser(data: any) {
  const user = await prisma.user.create({
    data,
  });
  return user;
}

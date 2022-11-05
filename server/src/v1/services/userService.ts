import { PrismaClient, Role, User } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(role: Role) {
  const users = await prisma.user.findMany({
    where: {
      role: role,
    },
  });
  return users;
}

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

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

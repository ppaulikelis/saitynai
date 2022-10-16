import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getGenders() {
  const genders = await prisma.gender.findMany();
  return genders;
}

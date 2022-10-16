import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getBloodTestAnalyteDescriptions() {
  const bloodTestAnalyteDescriptions = await prisma.bloodTestAnalyteDescription.findMany();
  return bloodTestAnalyteDescriptions;
}

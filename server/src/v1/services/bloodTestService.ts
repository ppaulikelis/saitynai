import { BloodTest, MedicalCard, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getBloodTests(page: number, count: number, medicalCardId: number, userId: number) {
  const skip = (page - 1) * count;
  const take = count;
  const bloodTests = await prisma.bloodTest.findMany({
    where: {
      medicalCardId: medicalCardId,
      medicalCard: {
        userId: userId,
      },
    },
    skip: skip,
    take: take,
  });
  return bloodTests;
}

export async function postBloodTest(data: BloodTest) {
  const bloodTest = await prisma.bloodTest.create({
    data: data,
  });
  return bloodTest;
}

export async function getBloodTest(id: number, medicalCardId: number, userId: number) {
  const bloodTest = await prisma.bloodTest.findFirst({
    where: {
      id: id,
      medicalCardId: medicalCardId,
      medicalCard: {
        userId: userId,
      },
    },
  });
  return bloodTest;
}

export async function updateBloodTest(id: number, data: MedicalCard) {
  const bloodTest = await prisma.bloodTest.update({
    where: {
      id: id,
    },
    data: data,
  });
  return bloodTest;
}

export async function deleteBloodTest(id: number) {
  await prisma.bloodTest.delete({
    where: {
      id: id,
    },
  });
}

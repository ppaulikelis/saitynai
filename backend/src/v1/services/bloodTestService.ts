import { BloodTest, MedicalCard, PrismaClient } from '@prisma/client';
import { handleListQuery } from '../utils/listQueryHandler';
const prisma = new PrismaClient();

export async function getBloodTests(page: number, count: number, medicalCardId: number, userId: number) {
  const { skip, take } = handleListQuery(page, count);
  const bloodTests = await prisma.bloodTest.findMany({
    orderBy: [
      {
        date: 'desc',
      },
    ],
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
  console.log(data);
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

export async function updateBloodTest(id: number, data: BloodTest) {
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

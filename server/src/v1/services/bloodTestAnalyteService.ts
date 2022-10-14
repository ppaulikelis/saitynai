import { BloodTest, BloodTestAnalyte, MedicalCard, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getBloodTestAnalytes(
  page: number,
  count: number,
  bloodTestId: number,
  medicalCardId: number,
  userId: number
) {
  const skip = (page - 1) * count;
  const take = count;
  const bloodTestsAnalytes = await prisma.bloodTestAnalyte.findMany({
    where: {
      bloodTestId: bloodTestId,
      bloodTest: {
        medicalCardId: medicalCardId,
        medicalCard: {
          userId: userId,
        },
      },
    },
    skip: skip,
    take: take,
  });
  return bloodTestsAnalytes;
}

export async function postBloodTestAnalyte(data: BloodTestAnalyte) {
  const bloodTestAnalyte = await prisma.bloodTestAnalyte.create({
    data: data,
  });
  return bloodTestAnalyte;
}

export async function getBloodTestAnalyte(id: number, bloodTestId: number, medicalCardId: number, userId: number) {
  const bloodTestAnalyte = await prisma.bloodTestAnalyte.findFirst({
    where: {
      id: id,
      bloodTestId: bloodTestId,
      bloodTest: {
        medicalCardId: medicalCardId,
        medicalCard: {
          userId: userId,
        },
      },
    },
  });
  return bloodTestAnalyte;
}

export async function updateBloodTestAnalyte(id: number, data: BloodTestAnalyte) {
  const bloodTestAnalyte = await prisma.bloodTestAnalyte.update({
    where: {
      id: id,
    },
    data: data,
  });
  return bloodTestAnalyte;
}

export async function deleteBloodTestAnalyte(id: number) {
  await prisma.bloodTestAnalyte.delete({
    where: {
      id: id,
    },
  });
}

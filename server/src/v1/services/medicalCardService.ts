import { MedicalCard, PrismaClient } from '@prisma/client';
import { handleListQuery } from '../utils/listQueryHandler';
const prisma = new PrismaClient();

export async function getMedicalCards(page: number, count: number, userId: number) {
  const { skip, take } = handleListQuery(page, count);
  const medicalCards = await prisma.medicalCard.findMany({
    where: {
      userId: userId,
    },
    skip: skip,
    take: take,
  });
  return medicalCards;
}

export async function postMedicalCard(data: MedicalCard) {
  const medicalCard = await prisma.medicalCard.create({
    data: data,
  });
  return medicalCard;
}

export async function getMedicalCard(id: number, userId: number) {
  const medicalCard = await prisma.medicalCard.findFirst({
    where: {
      id: id,
      userId: userId,
    },
  });
  return medicalCard;
}

export async function updateMedicalCard(id: number, data: MedicalCard) {
  const medicalCard = await prisma.medicalCard.update({
    where: {
      id: id,
    },
    data: data,
  });
  return medicalCard;
}

export async function deleteMedicalCard(id: number) {
  await prisma.medicalCard.delete({
    where: {
      id: id,
    },
  });
}

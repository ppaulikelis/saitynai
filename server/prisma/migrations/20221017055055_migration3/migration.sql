/*
  Warnings:

  - A unique constraint covering the columns `[medicalCardId,date]` on the table `BloodTest` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,surname,userId]` on the table `MedicalCard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `medicalcard` MODIFY `surname` VARCHAR(191) NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `BloodTest_medicalCardId_date_key` ON `BloodTest`(`medicalCardId`, `date`);

-- CreateIndex
CREATE UNIQUE INDEX `MedicalCard_name_surname_userId_key` ON `MedicalCard`(`name`, `surname`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Post_title_key` ON `Post`(`title`);

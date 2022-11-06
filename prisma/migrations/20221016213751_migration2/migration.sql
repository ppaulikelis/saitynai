/*
  Warnings:

  - Added the required column `genderId` to the `MedicalCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `MedicalCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bloodtest` MODIFY `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `medicalcard` ADD COLUMN `genderId` INTEGER NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `surname` VARCHAR(191) NULL,
    MODIFY `birthDate` DATE NOT NULL;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN', 'EDITOR') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Gender` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BloodTestAnalyte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` DOUBLE NOT NULL,
    `bloodTestId` INTEGER NOT NULL,
    `bloodTestAnalyteDescriptionId` INTEGER NOT NULL,

    UNIQUE INDEX `BloodTestAnalyte_bloodTestId_bloodTestAnalyteDescriptionId_key`(`bloodTestId`, `bloodTestAnalyteDescriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BloodTestAnalyteDescription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `abbreviation` VARCHAR(191) NULL,
    `unit` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` VARCHAR(191) NOT NULL,
    `editorId` INTEGER NOT NULL,
    `lastEditorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MedicalCard` ADD CONSTRAINT `MedicalCard_genderId_fkey` FOREIGN KEY (`genderId`) REFERENCES `Gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MedicalCard` ADD CONSTRAINT `MedicalCard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BloodTestAnalyte` ADD CONSTRAINT `BloodTestAnalyte_bloodTestId_fkey` FOREIGN KEY (`bloodTestId`) REFERENCES `BloodTest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BloodTestAnalyte` ADD CONSTRAINT `BloodTestAnalyte_bloodTestAnalyteDescriptionId_fkey` FOREIGN KEY (`bloodTestAnalyteDescriptionId`) REFERENCES `BloodTestAnalyteDescription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_lastEditorId_fkey` FOREIGN KEY (`lastEditorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

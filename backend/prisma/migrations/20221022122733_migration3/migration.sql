-- DropForeignKey
ALTER TABLE `bloodtest` DROP FOREIGN KEY `BloodTest_medicalCardId_fkey`;

-- DropForeignKey
ALTER TABLE `bloodtestanalyte` DROP FOREIGN KEY `BloodTestAnalyte_bloodTestId_fkey`;

-- DropForeignKey
ALTER TABLE `medicalcard` DROP FOREIGN KEY `MedicalCard_userId_fkey`;

-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_editorId_fkey`;

-- AlterTable
ALTER TABLE `post` ADD COLUMN `lastEditedDate` DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `MedicalCard` ADD CONSTRAINT `MedicalCard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BloodTest` ADD CONSTRAINT `BloodTest_medicalCardId_fkey` FOREIGN KEY (`medicalCardId`) REFERENCES `MedicalCard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BloodTestAnalyte` ADD CONSTRAINT `BloodTestAnalyte_bloodTestId_fkey` FOREIGN KEY (`bloodTestId`) REFERENCES `BloodTest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

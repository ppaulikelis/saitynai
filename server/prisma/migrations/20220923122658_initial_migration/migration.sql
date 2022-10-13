-- CreateTable
CREATE TABLE `MedicalCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(35) NOT NULL,
    `surname` VARCHAR(35) NOT NULL,
    `birthDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BloodTest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `medicalCardId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BloodTest` ADD CONSTRAINT `BloodTest_medicalCardId_fkey` FOREIGN KEY (`medicalCardId`) REFERENCES `MedicalCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

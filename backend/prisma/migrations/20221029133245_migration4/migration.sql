/*
  Warnings:

  - You are about to alter the column `name` on the `bloodtestanalytedescription` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `name` on the `medicalcard` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(35)`.
  - You are about to alter the column `surname` on the `medicalcard` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(35)`.
  - You are about to alter the column `title` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `description` on the `post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.
  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(50)`.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_editorId_fkey`;

-- AlterTable
ALTER TABLE `bloodtestanalytedescription` MODIFY `name` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `medicalcard` MODIFY `name` VARCHAR(35) NOT NULL,
    MODIFY `surname` VARCHAR(35) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `post` MODIFY `title` VARCHAR(50) NOT NULL,
    MODIFY `description` VARCHAR(50) NOT NULL,
    MODIFY `content` VARCHAR(2000) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `email` VARCHAR(255) NOT NULL,
    MODIFY `password` VARCHAR(50) NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_editorId_fkey` FOREIGN KEY (`editorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

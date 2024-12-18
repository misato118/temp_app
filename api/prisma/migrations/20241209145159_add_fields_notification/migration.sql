/*
  Warnings:

  - You are about to drop the column `companyId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Notification` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_itemId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "companyId",
DROP COLUMN "itemId",
ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "itemName" TEXT;

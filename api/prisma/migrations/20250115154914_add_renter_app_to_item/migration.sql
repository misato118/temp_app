/*
  Warnings:

  - Added the required column `itemId` to the `RenterApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RenterApplication" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "RenterApplication" ADD CONSTRAINT "RenterApplication_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

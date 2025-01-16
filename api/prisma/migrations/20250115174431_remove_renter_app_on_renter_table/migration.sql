/*
  Warnings:

  - You are about to drop the `RenterApplicationsOnRenters` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `renterId` to the `RenterApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RenterApplicationsOnRenters" DROP CONSTRAINT "RenterApplicationsOnRenters_renterApplicationId_fkey";

-- DropForeignKey
ALTER TABLE "RenterApplicationsOnRenters" DROP CONSTRAINT "RenterApplicationsOnRenters_renterId_fkey";

-- AlterTable
ALTER TABLE "RenterApplication" ADD COLUMN     "renterId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "RenterApplicationsOnRenters";

-- AddForeignKey
ALTER TABLE "RenterApplication" ADD CONSTRAINT "RenterApplication_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

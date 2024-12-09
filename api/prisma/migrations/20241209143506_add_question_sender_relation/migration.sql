/*
  Warnings:

  - You are about to drop the column `answerId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `questionId` on the `Renter` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `Answer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_answerId_fkey";

-- DropForeignKey
ALTER TABLE "Renter" DROP CONSTRAINT "Renter_questionId_fkey";

-- DropIndex
DROP INDEX "Employee_answerId_key";

-- DropIndex
DROP INDEX "Renter_questionId_key";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "answerId";

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "senderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Renter" DROP COLUMN "questionId";

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

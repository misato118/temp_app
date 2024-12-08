/*
  Warnings:

  - A unique constraint covering the columns `[formId]` on the table `RenterApplication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `formId` to the `RenterApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RenterApplication" ADD COLUMN     "formId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Form" (
    "id" SERIAL NOT NULL,
    "offeringPrice" DECIMAL(9,2) NOT NULL,
    "offeringDuration" INTEGER NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RenterApplication_formId_key" ON "RenterApplication"("formId");

-- AddForeignKey
ALTER TABLE "RenterApplication" ADD CONSTRAINT "RenterApplication_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

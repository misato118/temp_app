/*
  Warnings:

  - Added the required column `senderId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "senderId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Renter" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imageURL" TEXT,

    CONSTRAINT "Renter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Renter_username_key" ON "Renter"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_email_key" ON "Renter"("email");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

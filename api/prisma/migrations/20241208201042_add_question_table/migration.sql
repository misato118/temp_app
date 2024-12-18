/*
  Warnings:

  - A unique constraint covering the columns `[questionId]` on the table `Renter` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Renter" ADD COLUMN     "questionId" INTEGER;

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Renter_questionId_key" ON "Renter"("questionId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE SET NULL ON UPDATE CASCADE;

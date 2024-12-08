/*
  Warnings:

  - A unique constraint covering the columns `[answerId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[answerId]` on the table `Question` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "answerId" INTEGER;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "answerId" INTEGER;

-- CreateTable
CREATE TABLE "Answer" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_answerId_key" ON "Employee"("answerId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_answerId_key" ON "Question"("answerId");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

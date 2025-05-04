/*
  Warnings:

  - Added the required column `password` to the `Renter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Renter" ADD COLUMN     "password" TEXT NOT NULL;

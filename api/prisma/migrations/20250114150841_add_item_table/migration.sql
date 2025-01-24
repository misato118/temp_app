-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('FURNITURE', 'MUSIC', 'TOOL');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "ItemCategory",
    "fee" DOUBLE PRECISION,
    "feeType" TEXT,
    "maxDuration" INTEGER,
    "maxDurationType" TEXT,
    "imageURL" TEXT,
    "deposit" DOUBLE PRECISION,
    "overallReview" INTEGER,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

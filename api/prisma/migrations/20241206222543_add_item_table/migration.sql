-- CreateEnum
CREATE TYPE "ItemCategory" AS ENUM ('FURNITURE', 'MUSIC', 'TOOL');

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "ItemCategory" NOT NULL,
    "fee" DECIMAL(9,2) NOT NULL,
    "feeType" TEXT NOT NULL,
    "maxDuration" INTEGER NOT NULL,
    "maxDurationType" TEXT NOT NULL,
    "imageURL" TEXT,
    "deposit" DECIMAL(9,2) NOT NULL,
    "overallReview" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

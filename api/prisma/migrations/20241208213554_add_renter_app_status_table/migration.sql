-- CreateEnum
CREATE TYPE "RenterApplicationStatusType" AS ENUM ('APPLIED', 'DECLINED', 'ACCEPTED', 'DELIVERED', 'RENTED', 'RETURNED', 'COMPLETED');

-- CreateTable
CREATE TABLE "RenterApplicationStatus" (
    "id" SERIAL NOT NULL,
    "status" "RenterApplicationStatusType" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "renterApplicationId" INTEGER NOT NULL,

    CONSTRAINT "RenterApplicationStatus_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RenterApplicationStatus" ADD CONSTRAINT "RenterApplicationStatus_renterApplicationId_fkey" FOREIGN KEY ("renterApplicationId") REFERENCES "RenterApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

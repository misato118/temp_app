-- CreateTable
CREATE TABLE "RenterApplication" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RenterApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RenterApplicationsOnRenters" (
    "renterId" INTEGER NOT NULL,
    "renterApplicationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RenterApplicationsOnRenters_pkey" PRIMARY KEY ("renterId","renterApplicationId")
);

-- AddForeignKey
ALTER TABLE "RenterApplicationsOnRenters" ADD CONSTRAINT "RenterApplicationsOnRenters_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenterApplicationsOnRenters" ADD CONSTRAINT "RenterApplicationsOnRenters_renterApplicationId_fkey" FOREIGN KEY ("renterApplicationId") REFERENCES "RenterApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

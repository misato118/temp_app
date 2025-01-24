-- CreateTable
CREATE TABLE "RenterApplication" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "formId" INTEGER NOT NULL,

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

-- AddForeignKey
ALTER TABLE "RenterApplicationsOnRenters" ADD CONSTRAINT "RenterApplicationsOnRenters_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RenterApplicationsOnRenters" ADD CONSTRAINT "RenterApplicationsOnRenters_renterApplicationId_fkey" FOREIGN KEY ("renterApplicationId") REFERENCES "RenterApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

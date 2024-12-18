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

-- CreateTable
CREATE TABLE "_AdminToRenter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_AdminToRenter_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Renter_username_key" ON "Renter"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Renter_email_key" ON "Renter"("email");

-- CreateIndex
CREATE INDEX "_AdminToRenter_B_index" ON "_AdminToRenter"("B");

-- AddForeignKey
ALTER TABLE "_AdminToRenter" ADD CONSTRAINT "_AdminToRenter_A_fkey" FOREIGN KEY ("A") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdminToRenter" ADD CONSTRAINT "_AdminToRenter_B_fkey" FOREIGN KEY ("B") REFERENCES "Renter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

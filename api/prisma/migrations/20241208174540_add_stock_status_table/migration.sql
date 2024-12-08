-- CreateTable
CREATE TABLE "StockStatus" (
    "id" SERIAL NOT NULL,
    "totalStock" INTEGER,
    "currentStock" INTEGER,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "StockStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StockStatus_itemId_key" ON "StockStatus"("itemId");

-- AddForeignKey
ALTER TABLE "StockStatus" ADD CONSTRAINT "StockStatus_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

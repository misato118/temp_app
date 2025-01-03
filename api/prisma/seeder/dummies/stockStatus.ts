import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = async () => {
  const transaction = [];

  // Create a new stock status for Nice Guitar
  const createItemStock = prisma.stockStatus.create({
    data: {
      totalStock: 350,
      currentStock: 350,
      itemId: 1
    }
   });
   transaction.push(createItemStock);

  // Connect the stock status to an item
  const updateItemStockStatus = prisma.item.update({
    where: {
      id: 1,
    },
    data: {
      stockStatus: {
        connect: {
            id: 1,
        }
      }
    }
  });
  transaction.push(updateItemStockStatus);
  return await prisma.$transaction(transaction);
}
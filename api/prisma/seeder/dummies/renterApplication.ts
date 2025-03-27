import { PrismaClient } from '@prisma/client';
import { RenterApplicationStatusType } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = async () => {
  const transaction = [];
  const createRenterApp1 = prisma.renterApplication.create({
    data: {
      createdAt: new Date(),
      renter: {
        connect: {
          id: 1,
        },
      },
      form: {
        create: {
          offeringPrice: 300,
          offeringDuration: 5,
        },
      },
      renterApplicationStatuses: {
        create: {
          status: RenterApplicationStatusType.APPLIED,
          updatedAt: new Date(),
        },
      },
      item: {
        connect: {
          id: 1,
        },
      },
    },
  });
  transaction.push(createRenterApp1);

  const createRenterApp2 = prisma.renterApplication.create({
    data: {
      createdAt: new Date(),
      renter: {
        connect: {
          id: 1,
        },
      },
      form: {
        create: {
          offeringPrice: 20.99,
          offeringDuration: 10,
        },
      },
      renterApplicationStatuses: {
        create: {
          status: RenterApplicationStatusType.APPLIED,
          updatedAt: new Date(),
        },
      },
      item: {
        connect: {
          id: 2,
        },
      },
    },
  });
  transaction.push(createRenterApp2);
  return await prisma.$transaction(transaction);
};

import { ItemCategory, ApplicationStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = async () => {
  const transaction = [];

  // Create an item, guitar
  const createGuitar = prisma.item.create({
    data: {
      name: 'Nice Guitar',
      description: 'This is a very expensive guitar.',
      createdAt: new Date(),
      updatedAt: new Date(),
      category: ItemCategory.MUSIC,
      fee: 50.99,
      feeType: 'daily',
      maxDuration: 30,
      maxDurationType: 'days',
      imageURL: 'https://www.test-image.com',
      deposit: 300.00,
      companyId: 1,
      ownerApplication: {
        create: {
          status: ApplicationStatus.APPLIED,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }
    }
  });
  transaction.push(createGuitar);

  // Connect an item to a company
  const updateCompanyGuitar = prisma.company.update({
    where: {
      id: 1,
    },
    data: {
      items: {
        connect: {
            id: 1,
        }
      }
    }
  });
  transaction.push(updateCompanyGuitar);

  // Create an item, chair
  const createChair = prisma.item.create({
    data: {
        name: 'Very Fancy Chair',
        description: 'This chair is extremely fancy.',
        createdAt: new Date(),
        updatedAt: new Date(),
        category: ItemCategory.FURNITURE,
        fee: 300.00,
        feeType: 'monthly',
        maxDuration: 2,
        maxDurationType: 'years',
        imageURL: 'https://www.test-image.com',
        deposit: 400.00,
        companyId: 1,
        ownerApplication: {
          create: {
            status: ApplicationStatus.APPLIED,
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        }
      }
  });
  transaction.push(createChair);

  // Connect an item to a company
  const updateCompanyChair = prisma.company.update({
    where: {
      id: 1,
    },
    data: {
      items: {
        connect: {
            id: 2,
        }
      }
    }
  });
  transaction.push(updateCompanyChair);

  return await prisma.$transaction(transaction);
};
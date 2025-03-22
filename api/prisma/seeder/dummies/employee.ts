import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = async () => {
  const transaction = [];
  const createEmployee1 = prisma.employee.create({
    data: {
      firstName: 'John',
      lastName: 'Lee',
      birthDate: new Date('2002-11-02'),
      email: 'johnlee@noemail.invalid',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://www.test-image.com',
      company: {
        connect: {
          id: 1,
        },
      },
    },
  });
  transaction.push(createEmployee1);

  const createEmployee2 = prisma.employee.create({
    data: {
      firstName: 'Kate',
      lastName: 'Gray',
      birthDate: new Date('1890-04-25'),
      email: 'katelee@noemail.invalid',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://www.test-image.com',
      company: {
        connect: {
          id: 1,
        },
      },
    },
  });
  transaction.push(createEmployee2);

  const createEmployee3 = prisma.employee.create({
    data: {
      firstName: 'Sarah',
      lastName: 'Wong',
      birthDate: new Date('2003-12-25'),
      email: 'sarahwong@noemail.invalid',
      createdAt: new Date(),
      updatedAt: new Date(),
      imageURL: 'https://www.test-image.com',
      company: {
        connect: {
          id: 1,
        },
      },
    },
  });
  transaction.push(createEmployee3);
  return await prisma.$transaction(transaction);
};

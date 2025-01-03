import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = async () => {
  const transaction = [];
  const createABCCompany = prisma.company.create({
    data: {
      name: 'ABC Company',
      email: 'abccompany@noemail.invalid',
      description: 'We\'re ABC Company.',
      createdAt: new Date(),
      updatedAt: new Date(),
      logoURL: 'https://www.test-image.com',
      employees: {
        create: [
          {
            firstName: 'John',
            lastName: 'Lee',
            birthDate: new Date('2002-11-02'),
            email: 'johnlee@noemail.invalid',
            createdAt: new Date(),
            updatedAt: new Date(),
            imageURL: 'https://www.test-image.com',
          },
          {
            firstName: 'Kate',
            lastName: 'Gray',
            birthDate: new Date('1890-04-25'),
            email: 'katelee@noemail.invalid',
            createdAt: new Date(),
            updatedAt: new Date(),
            imageURL: 'https://www.test-image.com',
          },
        ]

      }
    }
  });
  transaction.push(createABCCompany);

  const createDEFCompany = prisma.company.create({
    data: {
      name: 'DEF Co.',
      email: 'defco@noemail.invalid',
      description: 'Hello, we\'re official.',
      createdAt: new Date(),
      updatedAt: new Date(),
      logoURL: 'https://www.test-image.com',
      employees: {
        create: [
          {
            firstName: 'Sarah',
            lastName: 'Wong',
            birthDate: new Date('2003-12-25'),
            email: 'sarahwong@noemail.invalid',
            createdAt: new Date(),
            updatedAt: new Date(),
            imageURL: 'https://www.test-image.com',
          },
        ]

      }
    }
  });
  transaction.push(createDEFCompany);

  return await prisma.$transaction(transaction);
};
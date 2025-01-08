import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = async () => {
  const transaction = [];
  const createCompany = prisma.company.create({
    data: {
        name: 'ABC Company',
        email: 'abccompany@noemail.invalid',
        description: 'We\'re ABC Company.',
        createdAt: new Date(),
        updatedAt: new Date(),
        logoURL: 'https://www.test-image.com',
        employees: {
          create: [{
            firstName: 'Emily',
            lastName: 'Burnett',
            birthDate: new Date('1890-04-05'),
            email: 'emilyburnett@noemail.invalid',
            createdAt: new Date(),
            updatedAt: new Date(),
            imageURL: 'https://www.test-image.com',
          }],
        }
      }
  });
  transaction.push(createCompany);
  return await prisma.$transaction(transaction);
};
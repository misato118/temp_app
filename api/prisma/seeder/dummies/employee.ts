import { Employee, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const employees: Omit<Employee, 'id'>[] = [
  {
    firstName: 'John',
    lastName: 'Lee2',
    birthDate: new Date('2002-11-02'),
    email: 'johnlee@noemail.invalid',
    createdAt: new Date(),
    updatedAt: new Date(),
    imageURL: 'https://www.test-image.com',
    companyId: 1,
  },
];

export const seed = async () => {
  const transaction = [];
  for (const employee of employees) {
    const updateCompany = prisma.company.update({
      where: {
        id: 1
      },
      data: {
        employees: {
          create: {
            firstName: 'John',
            lastName: 'Lee2',
            birthDate: new Date('2002-11-02'),
            email: 'johnlee@noemail.invalid',
            createdAt: new Date(),
            updatedAt: new Date(),
            imageURL: 'https://www.test-image.com',
          },
          connect: {
            id: 1
          }
        }
      }
    });
    transaction.push(updateCompany);
  }
  return await prisma.$transaction(transaction);
};
import { Employee, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const employees: Omit<Employee, 'id'>[] = [
  {
    firstName: 'John',
    lastName: 'Lee2',
    birthDate: new Date('2002-11-02'),
    email: 'johnlee@email.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    imageURL: 'https://www.test-image.com',
    companyId: 1
  },
];

export const seed = async () => {
  const transaction = [];
  for (const employee of employees) {
    const createEmployees = prisma.employee.create({
      data: employee,
    });
    transaction.push(createEmployees);
  }
  return await prisma.$transaction(transaction);
};
import { Company, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const companies: Omit<Company, 'id'>[] = [
  {
    name: 'ABC Company',
    email: 'abccompany@noemail.invalid',
    description: 'We\'re ABC Company.',
    createdAt: new Date(),
    updatedAt: new Date(),
    logoURL: 'https://www.test-image.com',
  },
  {
    name: 'DEF Co.',
    email: 'defco@noemail.invalid',
    description: 'Hello, we\'re official.',
    createdAt: new Date(),
    updatedAt: new Date(),
    logoURL: 'https://www.test-image.com',
  },
];

export const seed = async () => {
  const transaction = [];
  for (const company of companies) {
    const createCompanies = prisma.company.create({
      data: company,
    });
    transaction.push(createCompanies);
  }
  return await prisma.$transaction(transaction);
};
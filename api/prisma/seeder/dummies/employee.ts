import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seed = async () => {
  const transaction = [];
  const createEmployee1 = prisma.employee.update({
    where: {
      id: 1,
    },
    data: {
      companyId: 1,
    }
  });
  transaction.push(createEmployee1);

  const createEmployee2 = prisma.employee.update({
    where: {
      id: 2,
    },
    data: {
      companyId: 1,
    }
  });
  transaction.push(createEmployee2);

  const createEmployee3 = prisma.employee.update({
    where: {
      id: 3,
    },
    data: {
      companyId: 2,
    }
  });
  transaction.push(createEmployee3);
  return await prisma.$transaction(transaction);
};
import { PrismaClient } from '@prisma/client';
import { seed as employeeSeeding } from './dummies/employee';
import { seed as companySeeding } from './dummies/company';
import { seed as itemSeeding } from './dummies/item';
import { seed as reviewSeeding } from './dummies/review';
import { seed as renterSeeding } from './dummies/renter';
import { seed as renterApplicationSeeding } from './dummies/renterApplication';

const prisma = new PrismaClient();

const main = async () => {
  console.log(`Start seeding ...`);

  await prisma.renterApplication.deleteMany();
  await prisma.renter.deleteMany();
  await prisma.review.deleteMany();
  await prisma.item.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.company.deleteMany();
  await prisma.stockStatus.deleteMany();
  await prisma.form.deleteMany();
  await prisma.renterApplicationStatus.deleteMany();

  await companySeeding();
  await employeeSeeding();
  await itemSeeding();
  await reviewSeeding();
  await renterSeeding();
  await renterApplicationSeeding();

  console.log(`Seeding finished.`);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

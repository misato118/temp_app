import { PrismaClient } from "@prisma/client";
import { seed as employeeSeeding } from "./dummies/employee";
import { seed as companySeeding } from "./dummies/company";
import { seed as itemSeeding } from "./dummies/item";
const prisma = new PrismaClient();

const main = async () => {
    console.log(`Start seeding ...`);
  
    await companySeeding();
    await employeeSeeding();
    await itemSeeding();

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
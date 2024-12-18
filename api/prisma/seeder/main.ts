import { PrismaClient } from "@prisma/client";
import { seed as employeeSeeding } from "./dummies/employee";
import { seed as companySeeding } from "./dummies/company";

const prisma = new PrismaClient();

const main = async () => {
    console.log(`Start seeding ...`);
  
    await companySeeding();
    await employeeSeeding();
  
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
import { PrismaClient } from "@prisma/client";
import { seed as companySeeding } from "./dummies/company";
import { seed as itemSeeding } from "./dummies/item";
import { seed as reviewSeeding } from "./dummies/review";
import { seed as stockStatusSeeding } from "./dummies/stockStatus";

const prisma = new PrismaClient();

const main = async () => {
    console.log(`Start seeding ...`);
  
    // Seed companies and nested employees
    await companySeeding();
    // Seed items and nested owner applications
    await itemSeeding();
    // Seed reviews
    await reviewSeeding();
    // Seed stock status
    await stockStatusSeeding();
  
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
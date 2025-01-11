import { PrismaClient } from "@prisma/client";
import ProductSeeders from "./product.seed";

const prisma = new PrismaClient();
const main = async () => {
  await ProductSeeders();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });

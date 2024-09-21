import { prisma } from "../src/helpers/database/prisma";
import { main } from "./seeders/map.seed";

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

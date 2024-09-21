"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../src/helpers/database/prisma");
const map_seed_1 = require("./seeders/map.seed");
(0, map_seed_1.main)()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma_1.prisma.$disconnect();
});

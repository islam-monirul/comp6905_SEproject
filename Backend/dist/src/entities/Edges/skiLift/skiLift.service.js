"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skiLiftService = void 0;
const prisma_1 = require("../../../helpers/database/prisma");
exports.skiLiftService = {
    create: async (data) => {
        const { timeTaken, name, length, fromNodeId, toNodeId } = data;
        const skiLift = await prisma_1.prisma.skiLift.create({
            data: {
                edge: {
                    create: { name, type: 'SKI_LIFT', fromNodeId, toNodeId, length, timeTaken, }
                }
            }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } }
        });
        return skiLift;
    },
    getMany: async () => {
        const skiLift = await prisma_1.prisma.skiLift.findMany({ include: { edge: { select: { fromNodeId: true, toNodeId: true } } } });
        return skiLift;
    },
    getOne: async (id) => {
        const skiLift = await prisma_1.prisma.skiLift.findUnique({ where: { id }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } } });
        return skiLift;
    },
    updateOne: async (id, data) => {
        const { name, fromNodeId, toNodeId, length } = data;
        const skiLift = await prisma_1.prisma.skiLift.findUnique({ where: { id } });
        if (!skiLift) {
            return null;
        }
        const updateSkiLift = await prisma_1.prisma.skiLift.update({
            where: { id: skiLift.id },
            data: { edge: { update: { name, fromNodeId, length, toNodeId } } }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } }
        });
        return updateSkiLift;
    },
    deleteOne: async (id) => {
        const deletedSkiLift = await prisma_1.prisma.skiLift.delete({ where: { id } });
        return deletedSkiLift;
    }
};

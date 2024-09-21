"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slopeService = void 0;
const prisma_1 = require("../../../helpers/database/prisma");
exports.slopeService = {
    create: async (data) => {
        const { timeTaken, length, difficulty, name, fromNodeId, toNodeId } = data;
        const slope = await prisma_1.prisma.slope.create({
            data: {
                difficulty,
                edge: {
                    create: {
                        length,
                        timeTaken,
                        type: 'SLOPE',
                        name,
                        fromNodeId, toNodeId
                    }
                }
            }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } }
        });
        return slope;
    },
    getMany: async () => {
        const slope = await prisma_1.prisma.slope.findMany({ include: { edge: { select: { fromNodeId: true, toNodeId: true } } } });
        return slope;
    },
    getOne: async (id) => {
        const slope = await prisma_1.prisma.slope.findUnique({ where: { id }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } } });
        return slope;
    },
    updateOne: async (id, data) => {
        const { name, fromNodeId, toNodeId, difficulty } = data;
        const slope = await prisma_1.prisma.slope.findUnique({ where: { id } });
        if (!slope) {
            return null;
        }
        const updateSlope = await prisma_1.prisma.slope.update({
            where: { id: slope.id },
            data: { difficulty, edge: { update: { name, fromNodeId, toNodeId } } }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } }
        });
        return updateSlope;
    },
    deleteOne: async (id) => {
        const deletedSlope = await prisma_1.prisma.slope.delete({ where: { id } });
        return deletedSlope;
    }
};

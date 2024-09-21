"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slopeStartService = void 0;
const prisma_1 = require("../../../helpers/database/prisma");
const nodes_helper_1 = require("../../../helpers/service/nodes.helper");
exports.slopeStartService = {
    create: async (data) => {
        const { name, difficulty, coordinates } = data;
        const slopeStart = await prisma_1.prisma.slopeStart.create({
            data: {
                difficulty,
                node: {
                    create: { name, type: 'SLOPE_START', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(slopeStart);
    },
    getMany: async () => {
        const slopeStarts = await prisma_1.prisma.slopeStart.findMany({ include: { node: { include: { coordinates: true } } } });
        return slopeStarts.map((r) => (0, nodes_helper_1.entityWithModifiedNode)(r));
    },
    getOne: async (id) => {
        const slopeStart = await prisma_1.prisma.slopeStart.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return slopeStart ? (0, nodes_helper_1.entityWithModifiedNode)(slopeStart) : null;
    },
    updateOne: async (id, data) => {
        const { name, difficulty, coordinates: { x, y } } = data;
        const slopeStart = await prisma_1.prisma.slopeStart.findUnique({ where: { id } });
        if (!slopeStart) {
            return null;
        }
        const updateSlopeStart = await prisma_1.prisma.slopeStart.update({
            where: { id: slopeStart.id },
            data: { difficulty, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(updateSlopeStart);
    },
    deleteOne: async (id) => {
        const deletedSlopeStart = await prisma_1.prisma.slopeStart.delete({ where: { id } });
        return deletedSlopeStart;
    }
};

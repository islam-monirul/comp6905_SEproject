"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slopeEndService = void 0;
const prisma_1 = require("../../../helpers/database/prisma");
const nodes_helper_1 = require("../../../helpers/service/nodes.helper");
exports.slopeEndService = {
    create: async (data) => {
        const { name, description, coordinates } = data;
        const slopeEnd = await prisma_1.prisma.slopeEnd.create({
            data: {
                description,
                node: {
                    create: { name, type: 'SLOPE_END', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(slopeEnd);
    },
    getMany: async () => {
        const slopeEnds = await prisma_1.prisma.slopeEnd.findMany({ include: { node: { include: { coordinates: true } } } });
        return slopeEnds.map((r) => (0, nodes_helper_1.entityWithModifiedNode)(r));
    },
    getOne: async (id) => {
        const slopeEnd = await prisma_1.prisma.slopeEnd.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return slopeEnd ? (0, nodes_helper_1.entityWithModifiedNode)(slopeEnd) : null;
    },
    updateOne: async (id, data) => {
        const { name, description, coordinates: { x, y } } = data;
        const slopeEnd = await prisma_1.prisma.slopeEnd.findUnique({ where: { id } });
        if (!slopeEnd) {
            return null;
        }
        const updateslopeEnd = await prisma_1.prisma.slopeEnd.update({
            where: { id: slopeEnd.id },
            data: { description, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(updateslopeEnd);
    },
    deleteOne: async (id) => {
        const deletedSlopeEnd = await prisma_1.prisma.slopeEnd.delete({ where: { id } });
        return deletedSlopeEnd;
    }
};

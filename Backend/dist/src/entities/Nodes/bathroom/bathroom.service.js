"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bathroomService = void 0;
const prisma_1 = require("../../../helpers/database/prisma");
const nodes_helper_1 = require("../../../helpers/service/nodes.helper");
exports.bathroomService = {
    create: async (data) => {
        const { name, hasShowers, coordinates } = data;
        const bathroom = await prisma_1.prisma.bathroom.create({
            data: {
                hasShowers,
                node: {
                    create: { name, type: 'BATHROOM', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(bathroom);
    },
    getMany: async () => {
        const bathrooms = await prisma_1.prisma.bathroom.findMany({ include: { node: { include: { coordinates: true } } } });
        return bathrooms.map((r) => (0, nodes_helper_1.entityWithModifiedNode)(r));
    },
    getOne: async (id) => {
        const bathroom = await prisma_1.prisma.bathroom.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return bathroom ? (0, nodes_helper_1.entityWithModifiedNode)(bathroom) : null;
    },
    updateOne: async (id, data) => {
        const { name, hasShowers, coordinates: { x, y } } = data;
        const bathroom = await prisma_1.prisma.bathroom.findUnique({ where: { id } });
        if (!bathroom) {
            return null;
        }
        const updateBathroom = await prisma_1.prisma.bathroom.update({
            where: { id: bathroom.id },
            data: { hasShowers, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(updateBathroom);
    },
    deleteOne: async (id) => {
        const deletedBathroom = await prisma_1.prisma.bathroom.delete({ where: { id } });
        return deletedBathroom;
    }
};

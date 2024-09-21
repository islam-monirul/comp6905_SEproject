"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftStationService = void 0;
const prisma_1 = require("../../../helpers/database/prisma");
const nodes_helper_1 = require("../../../helpers/service/nodes.helper");
exports.liftStationService = {
    create: async (data) => {
        const { name, capacity, coordinates } = data;
        const liftStation = await prisma_1.prisma.liftStation.create({
            data: {
                capacity,
                node: {
                    create: { name, type: 'LIFT_STATION', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(liftStation);
    },
    getMany: async () => {
        const liftStations = await prisma_1.prisma.liftStation.findMany({ include: { node: { include: { coordinates: true } } } });
        return liftStations.map((r) => (0, nodes_helper_1.entityWithModifiedNode)(r));
    },
    getOne: async (id) => {
        const liftStation = await prisma_1.prisma.liftStation.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return liftStation ? (0, nodes_helper_1.entityWithModifiedNode)(liftStation) : null;
    },
    updateOne: async (id, data) => {
        const { name, capacity, coordinates: { x, y } } = data;
        const liftStation = await prisma_1.prisma.liftStation.findUnique({ where: { id } });
        if (!liftStation) {
            return null;
        }
        const updateLiftStation = await prisma_1.prisma.liftStation.update({
            where: { id: liftStation.id },
            data: { capacity, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(updateLiftStation);
    },
    deleteOne: async (id) => {
        const deletedLiftStation = await prisma_1.prisma.liftStation.delete({ where: { id } });
        return deletedLiftStation;
    }
};

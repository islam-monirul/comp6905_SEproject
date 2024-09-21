import { prisma } from '../../../helpers/database/prisma';
import { entityWithModifiedNode } from '../../../helpers/service/nodes.helper';

export const liftStationService = {
    create: async (data: any) => {
        const { name, capacity, coordinates } = data;
        const liftStation = await prisma.liftStation.create({
            data: {
                capacity,
                node: {
                    create:
                        { name, type: 'LIFT_STATION', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        })
        return entityWithModifiedNode(liftStation);
    },
    getMany: async () => {
        const liftStations = await prisma.liftStation.findMany({ include: { node: { include: { coordinates: true } } } })
        return liftStations.map((r) => entityWithModifiedNode(r));
    },
    getOne: async (id: string) => {
        const liftStation = await prisma.liftStation.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return liftStation ? entityWithModifiedNode(liftStation) : null;
    },
    updateOne: async (id: string, data: any) => {
        const { name, capacity, coordinates: { x, y } } = data;
        const liftStation = await prisma.liftStation.findUnique({ where: { id } })

        if (!liftStation) {
            return null;
        }

        const updateLiftStation = await prisma.liftStation.update({
            where: { id: liftStation.id },
            data: { capacity, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        })

        return entityWithModifiedNode(updateLiftStation);
    },
    deleteOne: async (id: string) => {
        const deletedLiftStation = await prisma.liftStation.delete({ where: { id } })
        return deletedLiftStation;
    }
}
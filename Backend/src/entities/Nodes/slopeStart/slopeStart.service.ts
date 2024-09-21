import { prisma } from '../../../helpers/database/prisma';
import { entityWithModifiedNode } from '../../../helpers/service/nodes.helper';

export const slopeStartService = {
    create: async (data: any) => {
        const { name, difficulty, coordinates } = data;
        const slopeStart = await prisma.slopeStart.create({
            data: {
                difficulty,
                node: {
                    create:
                        { name, type: 'SLOPE_START', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        })
        return entityWithModifiedNode(slopeStart);
    },
    getMany: async () => {
        const slopeStarts = await prisma.slopeStart.findMany({ include: { node: { include: { coordinates: true } } } })
        return slopeStarts.map((r) => entityWithModifiedNode(r));
    },
    getOne: async (id: string) => {
        const slopeStart = await prisma.slopeStart.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return slopeStart ? entityWithModifiedNode(slopeStart) : null;
    },
    updateOne: async (id: string, data: any) => {
        const { name, difficulty, coordinates: { x, y } } = data;
        const slopeStart = await prisma.slopeStart.findUnique({ where: { id } })

        if (!slopeStart) {
            return null;
        }

        const updateSlopeStart = await prisma.slopeStart.update({
            where: { id: slopeStart.id },
            data: { difficulty, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        })

        return entityWithModifiedNode(updateSlopeStart);
    },
    deleteOne: async (id: string) => {
        const deletedSlopeStart = await prisma.slopeStart.delete({ where: { id } })
        return deletedSlopeStart;
    }
}
import { prisma } from '../../../helpers/database/prisma';
import { entityWithModifiedNode } from '../../../helpers/service/nodes.helper';

export const slopeEndService = {
    create: async (data: any) => {
        const { name, description, coordinates } = data;
        const slopeEnd = await prisma.slopeEnd.create({
            data: {
                description,
                node: {
                    create:
                        { name, type: 'SLOPE_END', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        })
        return entityWithModifiedNode(slopeEnd);
    },
    getMany: async () => {
        const slopeEnds = await prisma.slopeEnd.findMany({ include: { node: { include: { coordinates: true } } } })
        return slopeEnds.map((r) => entityWithModifiedNode(r));
    },
    getOne: async (id: string) => {
        const slopeEnd = await prisma.slopeEnd.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return slopeEnd ? entityWithModifiedNode(slopeEnd) : null;
    },
    updateOne: async (id: string, data: any) => {
        const { name, description, coordinates: { x, y } } = data;
        const slopeEnd = await prisma.slopeEnd.findUnique({ where: { id } })

        if (!slopeEnd) {
            return null;
        }

        const updateslopeEnd = await prisma.slopeEnd.update({
            where: { id: slopeEnd.id },
            data: { description, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        })

        return entityWithModifiedNode(updateslopeEnd);
    },
    deleteOne: async (id: string) => {
        const deletedSlopeEnd = await prisma.slopeEnd.delete({ where: { id } })
        return deletedSlopeEnd;
    }
}
import { prisma } from '../../../helpers/database/prisma';
import { entityWithModifiedNode } from '../../../helpers/service/nodes.helper';

export const bathroomService = {
    create: async (data: any) => {
        const { name, hasShowers, coordinates } = data;
        const bathroom = await prisma.bathroom.create({
            data: {
                hasShowers,
                node: {
                    create:
                        { name, type: 'BATHROOM', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        })
        return entityWithModifiedNode(bathroom);
    },
    getMany: async () => {
        const bathrooms = await prisma.bathroom.findMany({ include: { node: { include: { coordinates: true } } } })
        return bathrooms.map((r) => entityWithModifiedNode(r));
    },
    getOne: async (id: string) => {
        const bathroom = await prisma.bathroom.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return bathroom ? entityWithModifiedNode(bathroom) : null;
    },
    updateOne: async (id: string, data: any) => {
        const { name, hasShowers, coordinates: { x, y } } = data;
        const bathroom = await prisma.bathroom.findUnique({ where: { id } })

        if (!bathroom) {
            return null;
        }

        const updateBathroom = await prisma.bathroom.update({
            where: { id: bathroom.id },
            data: { hasShowers, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        })

        return entityWithModifiedNode(updateBathroom);
    },
    deleteOne: async (id: string) => {
        const deletedBathroom = await prisma.bathroom.delete({ where: { id } })
        return deletedBathroom;
    }
}
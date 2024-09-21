import { prisma } from '../../../helpers/database/prisma';

export const skiLiftService = {
    create: async (data: any) => {
        const { timeTaken, name, length, fromNodeId, toNodeId } = data;
        const skiLift = await prisma.skiLift.create({
            data: {
                edge: {
                    create:
                        { name, type: 'SKI_LIFT', fromNodeId, toNodeId, length, timeTaken, }
                }
            }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } }
        })
        return skiLift;
    },
    getMany: async () => {
        const skiLift = await prisma.skiLift.findMany({ include: { edge: { select: { fromNodeId: true, toNodeId: true } } } })
        return skiLift
    },
    getOne: async (id: string) => {
        const skiLift = await prisma.skiLift.findUnique({ where: { id }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } } });
        return skiLift
    },
    updateOne: async (id: string, data: any) => {
        const { name, fromNodeId, toNodeId, length } = data;
        const skiLift = await prisma.skiLift.findUnique({ where: { id } })

        if (!skiLift) {
            return null;
        }

        const updateSkiLift = await prisma.skiLift.update({
            where: { id: skiLift.id },
            data: { edge: { update: { name, fromNodeId, length, toNodeId } } }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } }
        })

        return updateSkiLift;
    },
    deleteOne: async (id: string) => {
        const deletedSkiLift = await prisma.skiLift.delete({ where: { id } })
        return deletedSkiLift;
    }
}
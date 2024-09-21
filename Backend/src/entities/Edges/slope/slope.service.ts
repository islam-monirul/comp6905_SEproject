import { prisma } from '../../../helpers/database/prisma';

export const slopeService = {
    create: async (data: any) => {
        const { timeTaken, length, difficulty, name, fromNodeId, toNodeId } = data;
        const slope = await prisma.slope.create({
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
        })
        return slope;
    },
    getMany: async () => {
        const slope = await prisma.slope.findMany({ include: { edge: { select: { fromNodeId: true, toNodeId: true } } } })
        return slope
    },
    getOne: async (id: string) => {
        const slope = await prisma.slope.findUnique({ where: { id }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } } });
        return slope
    },
    updateOne: async (id: string, data: any) => {
        const { name, fromNodeId, toNodeId, difficulty } = data;
        const slope = await prisma.slope.findUnique({ where: { id } })

        if (!slope) {
            return null;
        }

        const updateSlope = await prisma.slope.update({
            where: { id: slope.id },
            data: { difficulty, edge: { update: { name, fromNodeId, toNodeId } } }, include: { edge: { select: { fromNodeId: true, toNodeId: true } } }
        })

        return updateSlope;
    },
    deleteOne: async (id: string) => {
        const deletedSlope = await prisma.slope.delete({ where: { id } })
        return deletedSlope;
    }
}
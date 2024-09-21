import { prisma } from '../../../helpers/database/prisma';
import { entityWithModifiedNode } from '../../../helpers/service/nodes.helper';

export const restaurantService = {
    create: async (data: any) => {
        const { name, menu, coordinates } = data;
        const restaurant = await prisma.restaurant.create({
            data: {
                menu,
                node: {
                    create:
                        { name, type: 'RESTAURANT', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        })
        return entityWithModifiedNode(restaurant);
    },
    getMany: async () => {
        const restaurants = await prisma.restaurant.findMany({ include: { node: { include: { coordinates: true } } } })
        return restaurants.map((r) => entityWithModifiedNode(r));
    },
    getOne: async (id: string) => {
        const restaurant = await prisma.restaurant.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return restaurant ? entityWithModifiedNode(restaurant) : null;
    },
    updateOne: async (id: string, data: any) => {
        const { name, menu, coordinates: { x, y } } = data;
        const restaurant = await prisma.restaurant.findUnique({ where: { id } })

        if (!restaurant) {
            return null;
        }

        const updateRestaurant = await prisma.restaurant.update({
            where: { id: restaurant.id },
            data: { menu, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        })

        return entityWithModifiedNode(updateRestaurant);
    },
    deleteOne: async (id: string) => {
        const deletedRestaurant = await prisma.restaurant.delete({ where: { id } })
        return deletedRestaurant;
    }
}
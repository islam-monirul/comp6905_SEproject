"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantService = void 0;
const prisma_1 = require("../../../helpers/database/prisma");
const nodes_helper_1 = require("../../../helpers/service/nodes.helper");
exports.restaurantService = {
    create: async (data) => {
        const { name, menu, coordinates } = data;
        const restaurant = await prisma_1.prisma.restaurant.create({
            data: {
                menu,
                node: {
                    create: { name, type: 'RESTAURANT', coordinates: { create: coordinates } }
                }
            }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(restaurant);
    },
    getMany: async () => {
        const restaurants = await prisma_1.prisma.restaurant.findMany({ include: { node: { include: { coordinates: true } } } });
        return restaurants.map((r) => (0, nodes_helper_1.entityWithModifiedNode)(r));
    },
    getOne: async (id) => {
        const restaurant = await prisma_1.prisma.restaurant.findUnique({ where: { id }, include: { node: { include: { coordinates: true } } } });
        return restaurant ? (0, nodes_helper_1.entityWithModifiedNode)(restaurant) : null;
    },
    updateOne: async (id, data) => {
        const { name, menu, coordinates: { x, y } } = data;
        const restaurant = await prisma_1.prisma.restaurant.findUnique({ where: { id } });
        if (!restaurant) {
            return null;
        }
        const updateRestaurant = await prisma_1.prisma.restaurant.update({
            where: { id: restaurant.id },
            data: { menu, node: { update: { name, coordinates: { update: { x, y } } } } }, include: { node: { include: { coordinates: true } } }
        });
        return (0, nodes_helper_1.entityWithModifiedNode)(updateRestaurant);
    },
    deleteOne: async (id) => {
        const deletedRestaurant = await prisma_1.prisma.restaurant.delete({ where: { id } });
        return deletedRestaurant;
    }
};

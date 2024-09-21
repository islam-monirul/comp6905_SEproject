"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("../../src/helpers/database/prisma");
const data_json_1 = __importDefault(require("./data.json"));
async function main() {
    const nodes = data_json_1.default.nodes;
    const seedCoordinates = nodes.map(({ nodeId, coordinates: { x, y } }) => {
        return { nodeId, x, y };
    });
    const savedCoordinates = await prisma_1.prisma.$transaction(seedCoordinates.map(({ x, y }) => prisma_1.prisma.coordinates.create({ data: { x, y } })));
    // const savedCoordinates = await prisma.coordinates.findMany()
    const coordinatesMappedToNodeId = seedCoordinates.reduce((map, item) => {
        map[item.nodeId] = savedCoordinates.find(({ x, y }) => x === item.x && y === item.y);
        return map;
    }, new Map());
    const seedNodes = nodes.map(item => ({
        type: item.type,
        name: item.name,
        coordinatesId: coordinatesMappedToNodeId[item.nodeId].id,
        nodeId: item.nodeId,
    }));
    const savedNodes = await prisma_1.prisma.$transaction(seedNodes.map((e) => {
        const { nodeId: _nodeId, ...res } = e;
        return prisma_1.prisma.node.create({ data: res });
    }));
    // const savedNodes = await prisma.node.findMany()
    const nodesMappedToNodeId = seedNodes.reduce((map, item) => {
        const element = savedNodes.find(({ type, name }) => type === item.type && name === item.name);
        map[item.nodeId] = element;
        return map;
    }, new Map());
    const edges = data_json_1.default.edges;
    const seedEdges = edges.map(item => {
        return {
            type: item.type,
            name: item.name,
            fromNodeId: nodesMappedToNodeId[item.fromNodeId].id,
            toNodeId: nodesMappedToNodeId[item.toNodeId].id,
            length: item.length,
            timeTaken: item.timeTaken,
            difficulty: item.difficulty
        };
    });
    const savedEdges = await prisma_1.prisma.$transaction(seedEdges.map((e) => {
        const type = e.type;
        return prisma_1.prisma.edge.create({
            data: {
                toNodeId: e.fromNodeId,
                fromNodeId: e.toNodeId,
                name: e.name,
                length: e.length,
                timeTaken: e.timeTaken,
                type: type,
                SkiLift: type === client_1.EdgeType.SKI_LIFT ? { create: {} } : undefined,
                Slope: type === client_1.EdgeType.SLOPE ? { create: { difficulty: e.difficulty } } : undefined
            }
        });
    }));
    // const savedEdges = await prisma.edge.findMany();
    console.log({ savedEdges });
}
exports.main = main;

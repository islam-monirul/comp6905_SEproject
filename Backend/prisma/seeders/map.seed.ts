import { EdgeType, NodeType } from "@prisma/client";
import { prisma } from "../../src/helpers/database/prisma";
import providedMap from './data.json';

export async function main() {

  const nodes = providedMap.nodes;
  const seedCoordinates = nodes.map(({ nodeId, coordinates: { x, y } }) => {
    return { nodeId, x, y };
  });


  const savedCoordinates = await prisma.$transaction(
    seedCoordinates.map(({ x, y }) => prisma.coordinates.create({ data: { x, y } })),
  );

  // const savedCoordinates = await prisma.coordinates.findMany()

  const coordinatesMappedToNodeId = seedCoordinates.reduce((map, item) => {
    map[item.nodeId] = savedCoordinates.find(({ x, y }) => x === item.x && y === item.y)
    return map;
  }, new Map());


  const seedNodes = nodes.map(item => ({
    type: item.type as NodeType,
    name: item.name,
    coordinatesId: coordinatesMappedToNodeId[item.nodeId].id,
    nodeId: item.nodeId,
  }));


  const savedNodes = await prisma.$transaction(
    seedNodes.map((e) => {
      const { nodeId: _nodeId, ...res } = e
      return prisma.node.create({ data: res })
    }),
  );
  // const savedNodes = await prisma.node.findMany()

  const nodesMappedToNodeId = seedNodes.reduce((map, item) => {
    const element = savedNodes.find(({ type, name }) => type === item.type && name === item.name)
    map[item.nodeId] = element
    return map;
  }, new Map());


  const edges = providedMap.edges

  const seedEdges = edges.map(item => {

    return {
      type: item.type as EdgeType,
      name: item.name,
      fromNodeId: nodesMappedToNodeId[item.fromNodeId].id as string,
      toNodeId: nodesMappedToNodeId[item.toNodeId].id as string,
      length: item.length as number,
      timeTaken: item.timeTaken as number,
      difficulty: item.difficulty as number
    }
  })

  const savedEdges = await prisma.$transaction(
    seedEdges.map((e) => {
      const type = e.type as EdgeType


      return prisma.edge.create({
        data: {
          toNodeId: e.fromNodeId,
          fromNodeId: e.toNodeId,
          name: e.name,
          length: e.length,
          timeTaken: e.timeTaken,
          type: type,
          SkiLift: type === EdgeType.SKI_LIFT ? { create: {} } : undefined,
          Slope: type === EdgeType.SLOPE ? { create: { difficulty: e.difficulty } } : undefined
        }
      })
    }
    ),
  );

  // const savedEdges = await prisma.edge.findMany();

  console.log({ savedEdges })

}
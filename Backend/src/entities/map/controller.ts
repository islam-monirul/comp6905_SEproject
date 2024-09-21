import express, { NextFunction, Request, Response } from 'express';
import { prisma } from '../../helpers/database/prisma';
import { asyncHandler } from '../../helpers/asyncHandler/asyncHandler';
import { MyError } from '../../helpers/error/error';
import { isAlreadyHere, mapDifficultyToFrontend, mapMetricToField, validateNodeId } from './helpers';
import { getPathsSchema } from './validation';
import { PathMetricsType } from './types';
import { dijkstra } from './algorithms/dijkstra';
import { dumpDijkstra } from './algorithms/suboptimalDijkstra';



const router = express.Router();

router.get('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { nodes, edges } = await getNodesAndEdges()
    return { nodes, edges }
}));



router.post(`/path`, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { startNodeId, targetNodeId, difficulty } = getPathsSchema.parse(req.body);
    const d = mapDifficultyToFrontend(difficulty)
    const { nodes, edges } = await getNodesAndEdges()
    if (!validateNodeId(startNodeId, nodes) || !validateNodeId(targetNodeId, nodes)) {
        return MyError(500, 'wrong node Id', 'REST')
    }

    const paths: any[] = [];

    const calculateMin = (metric: PathMetricsType) => {
        const min = dijkstra(nodes, edges, startNodeId, targetNodeId, metric, d);
        if (min && min.path.length > 0) {
            if (!isAlreadyHere(paths, min.pathHash)) {
                // @ts-ignore
                min.tags = { ...min.tags, [mapMetricToField[metric]]: true }
                paths.push(min)
            }
            else {
                const p = paths.findIndex(p => p.pathHash === min.pathHash);
                paths[p].tags = { ...paths[p]?.tags, [mapMetricToField[metric]]: true }
            }
        }
    };

    calculateMin("Distance");
    calculateMin("Difficulty");
    calculateMin("TimeTaken");


    const d1 = dumpDijkstra(nodes, edges, startNodeId, targetNodeId, "Difficulty", d)
    if (d1.path.length > 0) paths.push(d1)
    const d2 = dumpDijkstra(nodes, edges, startNodeId, targetNodeId, "TimeTaken", d)
    if (d2.path.length > 0) paths.push(d2)

    return paths;

}));


export default router


const getNodesAndEdges = async () => {
    const nodes = await prisma.node.findMany({
        include: {
            coordinates: true, Bathroom: true, Restaurant: true, LiftStation: true, SlopeEnd: true, SlopeStart: true
        },
    });

    const nodeElements: any[] = [];

    nodes.forEach((node) => {
        const { SlopeStart, SlopeEnd, LiftStation, Restaurant, Bathroom, ...res } = node
        nodeElements.push(res)
    });


    const edges = await prisma.edge.findMany({ include: { Slope: true } });
    const edgeElements: any[] = [];

    edges.forEach((edge) => {
        const { Slope, ...reset } = edge;
        const difficulty = edge.Slope && edge.Slope[0] && edge.Slope[0].difficulty;
        edgeElements.push({ ...reset, difficulty });

    });
    return { nodes: nodeElements, edges: edgeElements }
}
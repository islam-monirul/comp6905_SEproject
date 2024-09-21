"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../helpers/database/prisma");
const asyncHandler_1 = require("../../helpers/asyncHandler/asyncHandler");
const error_1 = require("../../helpers/error/error");
const helpers_1 = require("./helpers");
const validation_1 = require("./validation");
const dijkstra_1 = require("./algorithms/dijkstra");
const suboptimalDijkstra_1 = require("./algorithms/suboptimalDijkstra");
const router = express_1.default.Router();
router.get('/', (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { nodes, edges } = await getNodesAndEdges();
    return { nodes, edges };
}));
router.post(`/path`, (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const { startNodeId, targetNodeId, difficulty } = validation_1.getPathsSchema.parse(req.body);
    const d = (0, helpers_1.mapDifficultyToFrontend)(difficulty);
    const { nodes, edges } = await getNodesAndEdges();
    if (!(0, helpers_1.validateNodeId)(startNodeId, nodes) || !(0, helpers_1.validateNodeId)(targetNodeId, nodes)) {
        return (0, error_1.MyError)(500, 'wrong node Id', 'REST');
    }
    const paths = [];
    const calculateMin = (metric) => {
        var _a;
        const min = (0, dijkstra_1.dijkstra)(nodes, edges, startNodeId, targetNodeId, metric, d);
        if (min && min.path.length > 0) {
            if (!(0, helpers_1.isAlreadyHere)(paths, min.pathHash)) {
                // @ts-ignore
                min.tags = { ...min.tags, [helpers_1.mapMetricToField[metric]]: true };
                paths.push(min);
            }
            else {
                const p = paths.findIndex(p => p.pathHash === min.pathHash);
                paths[p].tags = { ...(_a = paths[p]) === null || _a === void 0 ? void 0 : _a.tags, [helpers_1.mapMetricToField[metric]]: true };
            }
        }
    };
    calculateMin("Distance");
    calculateMin("Difficulty");
    calculateMin("TimeTaken");
    const d1 = (0, suboptimalDijkstra_1.dumpDijkstra)(nodes, edges, startNodeId, targetNodeId, "Difficulty", d);
    if (d1.path.length > 0)
        paths.push(d1);
    const d2 = (0, suboptimalDijkstra_1.dumpDijkstra)(nodes, edges, startNodeId, targetNodeId, "TimeTaken", d);
    if (d2.path.length > 0)
        paths.push(d2);
    return paths;
}));
exports.default = router;
const getNodesAndEdges = async () => {
    const nodes = await prisma_1.prisma.node.findMany({
        include: {
            coordinates: true, Bathroom: true, Restaurant: true, LiftStation: true, SlopeEnd: true, SlopeStart: true
        },
    });
    const nodeElements = [];
    nodes.forEach((node) => {
        const { SlopeStart, SlopeEnd, LiftStation, Restaurant, Bathroom, ...res } = node;
        nodeElements.push(res);
    });
    const edges = await prisma_1.prisma.edge.findMany({ include: { Slope: true } });
    const edgeElements = [];
    edges.forEach((edge) => {
        const { Slope, ...reset } = edge;
        const difficulty = edge.Slope && edge.Slope[0] && edge.Slope[0].difficulty;
        edgeElements.push({ ...reset, difficulty });
    });
    return { nodes: nodeElements, edges: edgeElements };
};

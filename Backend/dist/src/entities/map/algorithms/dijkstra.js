"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dijkstra = void 0;
const helpers_1 = require("../helpers");
function dijkstra(nodes, edges, startNodeId, endNodeId, costBasedOnWhat, d) {
    const costs = {};
    const previous = {};
    const edgeToNode = {};
    const visited = {};
    nodes.forEach(node => {
        costs[node.id] = Infinity;
        previous[node.id] = null;
        edgeToNode[node.id] = null;
        visited[node.id] = false;
    });
    costs[startNodeId] = 0;
    while (true) {
        let current = null;
        let minCost = Infinity;
        for (const nodeId in costs) {
            if (!visited[nodeId] && costs[nodeId] < minCost) {
                minCost = costs[nodeId];
                current = nodeId;
            }
        }
        if (current === null)
            break;
        if (current === endNodeId)
            break;
        visited[current] = true;
        edges.filter(edge => edge.fromNodeId === current).forEach(edge => {
            // is legal actions?
            const difficulty = edge.difficulty | 1;
            if (!(d === null || d === void 0 ? void 0 : d.includes(difficulty))) {
                return;
            }
            const nCost = edge[helpers_1.mapMetricToField[costBasedOnWhat]] | 1;
            //@ts-ignore
            const score = costs[current] + nCost;
            if (score < costs[edge.toNodeId]) {
                costs[edge.toNodeId] = score;
                previous[edge.toNodeId] = current;
                edgeToNode[edge.toNodeId] = edge;
            }
        });
    }
    const path = [];
    let currentNode = endNodeId;
    while (currentNode !== startNodeId) {
        const previousNode = previous[currentNode];
        if (previousNode === null)
            break; //return null;
        path.unshift(edgeToNode[currentNode]);
        currentNode = previousNode;
    }
    const metric = { distance: 0, timeTaken: 0, difficulty: 0 };
    path.reduce((currM, edge) => {
        currM.difficulty += (edge.difficulty || 0);
        currM.distance += (edge.length || 0);
        currM.timeTaken += (edge.timeTaken || 0);
        return currM;
    }, metric);
    return { path, metric, pathHash: path.map((node) => node.id).join('') };
}
exports.dijkstra = dijkstra;

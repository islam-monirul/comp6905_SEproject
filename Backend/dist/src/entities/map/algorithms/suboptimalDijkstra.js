"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dumpDijkstra = void 0;
const helpers_1 = require("../helpers");
function dumpDijkstra(nodes, edges, startNodeId, endNodeId, costBasedOnWhat, d) {
    const costs = {};
    const secondLeastCosts = {}; // Track the second least costs
    const previous = {};
    const edgeToNode = {};
    const visited = {};
    nodes.forEach(node => {
        costs[node.id] = Infinity;
        secondLeastCosts[node.id] = Infinity; // Initialize second least costs as Infinity
        previous[node.id] = null;
        edgeToNode[node.id] = null;
        visited[node.id] = false;
    });
    costs[startNodeId] = 0;
    secondLeastCosts[startNodeId] = 0; // Initialize the starting node's second least cost as 0
    while (true) {
        let current = null;
        let minCost = Infinity;
        let secondMinCost = Infinity; // Track the second minimum cost
        for (const nodeId in costs) {
            if (!visited[nodeId] && costs[nodeId] < minCost) {
                secondMinCost = minCost; // Update the second minimum cost
                minCost = costs[nodeId];
                current = nodeId;
            }
            else if (!visited[nodeId] && costs[nodeId] < secondMinCost && costs[nodeId] !== minCost) {
                secondMinCost = costs[nodeId];
            }
        }
        if (current === null)
            break;
        if (current === endNodeId)
            break;
        visited[current] = true;
        edges.filter(edge => edge.fromNodeId === current).forEach(edge => {
            const difficulty = edge.difficulty || 1;
            if (!(d === null || d === void 0 ? void 0 : d.includes(difficulty))) {
                return;
            }
            const nCost = edge[helpers_1.mapMetricToField[costBasedOnWhat]] || 1;
            // @ts-ignore
            const score = costs[current] + nCost;
            // Update second least cost if applicable
            if (score < costs[edge.toNodeId]) {
                secondLeastCosts[edge.toNodeId] = Math.min(secondLeastCosts[edge.toNodeId], score);
            }
            if (score < costs[edge.toNodeId]) {
                costs[edge.toNodeId] = score;
                previous[edge.toNodeId] = current;
                edgeToNode[edge.toNodeId] = edge;
            }
            else if (score < secondLeastCosts[edge.toNodeId]) {
                secondLeastCosts[edge.toNodeId] = score;
            }
        });
    }
    const path = [];
    let currentNode = endNodeId;
    while (currentNode !== startNodeId) {
        const previousNode = previous[currentNode];
        if (previousNode === null)
            break;
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
    return { path, metric, pathHash: path.map((node) => node.id).join(''), tag: { dump: true } };
}
exports.dumpDijkstra = dumpDijkstra;

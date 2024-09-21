"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNodeId = exports.isAlreadyHere = exports.checkStringInArrayObject = exports.mapDifficultyToFrontend = exports.mapMetricToField = exports.PathMetrics = void 0;
exports.PathMetrics = ["TimeTaken", "Distance", "Difficulty"];
exports.mapMetricToField = {
    "TimeTaken": "timeTaken",
    "Distance": "length",
    "Difficulty": "difficulty"
};
const mapDifficultyToFrontend = (sad) => {
    const map = {
        0: 1,
        1: 1.5,
        2: 2
    };
    let res = [];
    for (let i = 0; i < sad.length; i++)
        if (sad[i])
            res.push(map[i]);
    return res;
};
exports.mapDifficultyToFrontend = mapDifficultyToFrontend;
const checkStringInArrayObject = (str, arr, key) => {
    return arr.some(element => element[key] === str);
};
exports.checkStringInArrayObject = checkStringInArrayObject;
const isAlreadyHere = (paths, newPathHash) => {
    // return paths.some(({ pathHash }) => pathHash == newPathHash)
    return (0, exports.checkStringInArrayObject)(newPathHash, paths, 'pathHash');
};
exports.isAlreadyHere = isAlreadyHere;
const validateNodeId = (nodeId, nodes) => {
    // return nodes.some(node => node.id === nodeId)
    return (0, exports.checkStringInArrayObject)(nodeId, nodes, 'id');
};
exports.validateNodeId = validateNodeId;

export const PathMetrics = ["TimeTaken", "Distance", "Difficulty"]
export const mapMetricToField = {
    "TimeTaken": "timeTaken",
    "Distance": "length",
    "Difficulty": "difficulty"
} as const

export const mapDifficultyToFrontend = (sad: boolean[]) => {
    const map = {
        0: 1,
        1: 1.5,
        2: 2
    } as const
    let res: number[] = []
    for (let i = 0; i < sad.length; i++) if (sad[i]) res.push(map[i])
    return res
}


export const checkStringInArrayObject = (str: string, arr: any[], key: string) => {
    return arr.some(element => element[key] === str)
}

export const isAlreadyHere = (paths: { pathHash: string }[], newPathHash: string) => {
    // return paths.some(({ pathHash }) => pathHash == newPathHash)
    return checkStringInArrayObject(newPathHash, paths, 'pathHash')
}
export const validateNodeId = (nodeId: string, nodes: any[]) => {
    // return nodes.some(node => node.id === nodeId)
    return checkStringInArrayObject(nodeId, nodes, 'id')
}


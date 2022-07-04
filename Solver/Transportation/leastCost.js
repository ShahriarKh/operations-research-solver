import Matrix from "ml-matrix";
import { useReactFlow } from "react-flow-renderer";

let matrix,
    costMatrix,
    sup,
    dem,
    totalSum = 0,
    currentSum = 0,
    i = 0,
    j = 0;

const iRegex = /^s(.*)-.*/;
const jRegex = /.*-d(.*)/;

function calculateCell() {}

export function leastCost(costs, supplies, demands) {
    alert(JSON.stringify(costs));

    sup = supplies;
    dem = demands;
    matrix = Matrix.zeros(sup.length, dem.length);

    Object.keys(costs).forEach((cost) => {
        const i = cost.match(iRegex)[1] - 1;
        const j = cost.match(jRegex)[1] - 1;
        console.log(i, j, costs[cost]);
        // costMatrix.set(i, j, costs[cost]);
    });

    return matrix;
}

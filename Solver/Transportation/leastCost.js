import Matrix from "ml-matrix";
import { useReactFlow } from "react-flow-renderer"

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

function calculateCell() {
    let minCost = costs;
    // let maxCell = Math.min(sup[i], dem[j]);
    // matrix.set(i, j, value);
    // currentSum += value;
    // sup[i] -= value;
    // dem[j] -= value;
    // if (value === sup[i] + value) {
    //     i++;
    //     // console.log("we move down");
    // } else {
    //     j++;
    //     // console.log("we move right");
    // }
    // if (currentSum < totalSum) {
    //     calculateCell(i, j);
    // }
    // return matrix;
}

export function leastCost(data, supplies, demands) {
    // alert(JSON.stringify(costs));
    console.log(data);

    // sup = supplies;
    // dem = demands;
    // matrix = Matrix.zeros(sup.length, dem.length);

    
    // reset every time the function is called
    // currentSum = 0;
    // costMatrix = costs;
    // matrix = matrix = Matrix.zeros(sup.length, dem.length);
    // const result = 12;

    return matrix;
}

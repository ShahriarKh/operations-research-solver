import Matrix from "ml-matrix";
import SolveSection from "../../Components/molecules/SolveSection";
import TransportTable from "../../Components/molecules/TransportTable";

let matrix,
    costMatrix,
    sup,
    dem,
    totalSum = 0,
    currentSum = 0,
    i = 0,
    j = 0;

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

export function leastCost(costs, supplies, demands) {
    // reset every time the function is called
    currentSum = 0;
    costMatrix = costs;
    // matrix = matrix = Matrix.zeros(sup.length, dem.length);
    const result = 12;

    return matrix;
}

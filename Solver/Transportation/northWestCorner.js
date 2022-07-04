import Matrix from "ml-matrix";

let matrix,
    sup,
    dem,
    totalSum = 0,
    currentSum = 0,
    i = 0,
    j = 0;

function calculateCell(i, j) {
    let value = Math.min(sup[i], dem[j]);
    matrix.set(i, j, value);
    currentSum += value;

    sup[i] -= value;
    dem[j] -= value;

    if (value === sup[i] + value) {
        i++;
        // console.log("we move down");
    } else {
        j++;
        // console.log("we move right");
    }

    if (currentSum < totalSum) {
        calculateCell(i, j);
    }
    return matrix;
}

export function northWestCorner(supplies, demands) {
    // reset every time the function is called
    sup = supplies
    dem = demands
    // cells
    currentSum = 0
    matrix = Matrix.zeros(sup.length, dem.length);
    // assuming problem is balanced, so sum of supplies = sum od demands and calculating one is enough
    totalSum = sup.reduce((a, b) => a + b, 0);

    calculateCell(i, j);

    return matrix;
}

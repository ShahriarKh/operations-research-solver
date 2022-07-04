import SolveSection from "../../Components/molecules/SolveSection";
import TransportTable from "../../Components/molecules/TransportTable";

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

export function northWestCorner(initialMatrix, supplies, demands, supplyNodes, demandNodes) {
    matrix = initialMatrix;
    // convert supply and demand objects to number arrays
    sup = Object.keys(supplies).map((key) => Number(supplies[key]));
    dem = Object.keys(demands).map((key) => Number(demands[key]));
    totalSum = sup.reduce((a, b) => a + b, 0);
    const result = calculateCell(i, j);

    return {
        northWestMatrixStep: (
            <SolveSection key="north-west" title={"Step 1: Initial BFS with North West Corner method"}>
                <TransportTable demands={demandNodes} supplies={supplyNodes} cells={result} />
            </SolveSection>
        ),
        northWestMatrix: result,
    };
}

import SolveSection from "../../Components/molecules/SolveSection";
import { Matrix } from "ml-matrix";

export function createMatrix(suppliesCount, demandsCount) {
    const matrix = Matrix.zeros(suppliesCount, demandsCount);

    return {
        matrixStep: (
            <SolveSection title={"Step 2: Matrix"}>
                <p>{JSON.stringify(matrix)}</p>
            </SolveSection>
        ),
        matrix: matrix,
    };
}

export function createCostMatrix(costs, suppliesCount, demandsCount) {
    const matrix = Matrix.zeros(suppliesCount, demandsCount);
    const iRegex = /^s(.*)-.*/;
    const jRegex = /.*-d(.*)/;

    Object.keys(costs).forEach((cost) => {
        const i = cost.match(iRegex)[1] - 1;
        const j = cost.match(jRegex)[1] - 1;
        matrix.set(i, j, costs[cost]);
    });

    return {
        costMatrixStep: (
            <SolveSection title={"Step 3: Cost Matrix"}>
                {JSON.stringify(matrix)}
            </SolveSection>
        ),
        costMatix: matrix,
    };
}

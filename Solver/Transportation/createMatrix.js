import SolveSection from "../../Components/molecules/SolveSection";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

export function createMatrix(suppliesCount, demandsCount) {

    const matrix = math.zeros(suppliesCount, demandsCount);

    return {
        matrixStep: (
            <SolveSection title={"Step 2: Matrix"}>
                {/* {JSON.stringify(supplies)} */}
                {/* {JSON.stringify(demands)} */}
                <p>{JSON.stringify(matrix._data)}</p>
            </SolveSection>
        ),
        matrix: matrix,
    };
}

export function createCostMatrix(costs, suppliesCount, demandsCount) {

    const matrix = math.zeros(suppliesCount, demandsCount);
    const iRegex = /^s(.*)-.*/
    const jRegex = /.*-d(.*)/

    Object.keys(costs).forEach((cost) => {
        const i = cost.match(iRegex)[1]
        const j = cost.match(jRegex)[1]
        console.log(`${cost}, ${i}:${j}`);
    })
    // for (const value in costs) {
        // console.log(costs[value]);
    // }

    return {
        costMatrixStep: (
            <SolveSection title={"Step 3: Cost Matrix"}>
                {/* {JSON.stringify(costs)} */}
                {/* {JSON.stringify(demands)} */}
                {/* <p>{JSON.stringify(matrix._data)}</p> */}
            </SolveSection>
        ),
        matrix: "4",
    };
}

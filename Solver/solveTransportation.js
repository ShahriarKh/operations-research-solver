import SolveSection from "../Components/molecules/SolveSection";
import TransportTable from "../Components/molecules/TransportTable";
import { checkBalance } from "./Transportation/checkBalance";
import { createCostMatrix } from "./Transportation/createMatrix";
import { leastCost } from "./Transportation/leastCost";
import { northWestCorner } from "./Transportation/northWestCorner";

export function solveTransportation(
    data,
    steps,
    setSteps,
    supplyNodes,
    demandNodes
) {
    // ========================================
    // Get Supply and Demand values from inputs
    // ========================================

    const supplyRegex = /^s\d*$/;
    const demandRegex = /^d\d*$/;
    const costRegex = /^s.*d\d*$/;

    // Create Objects from fomr data
    const suppliesObject = Object.fromEntries(
        Object.entries(data).filter(([key]) => supplyRegex.test(key))
    );

    const demandsObject = Object.fromEntries(
        Object.entries(data).filter(([key]) => demandRegex.test(key))
    );

    const costsObject = Object.fromEntries(
        Object.entries(data).filter(([key]) => costRegex.test(key))
    );

    // create arrays from objetcs
    const suppliesArray = Object.keys(suppliesObject).map((key) =>
        Number(suppliesObject[key])
    );

    const demandsArray = Object.keys(demandsObject).map((key) =>
        Number(demandsObject[key])
    );

    const costsArray = Object.keys(costsObject).map((key) =>
        Number(costsObject[key])
    );
    // const total = suppliesArray.reduce((a, b) => a + b, 0);

    const suppliesCount = suppliesArray.length;
    const demandsCount = demandsArray.length;

    const suppliesSum = suppliesArray.reduce((a, b) => a + b, 0);
    const demandsSum = demandsArray.reduce((a, b) => a + b, 0);

    // ========================================
    // Check Problem Balance
    // ========================================

    const balanceStep = checkBalance(suppliesSum, demandsSum);
    setSteps((steps) => [...steps, balanceStep]);

    // ========================================
    // Create Matrix
    // ========================================

    let costMatrix = createCostMatrix(costsObject, suppliesCount, demandsCount);

    // ========================================
    // North-west Corner
    // ========================================

    let nwcMatrix = northWestCorner(suppliesArray, demandsArray);
    let nwcComp = (
        <SolveSection
            key="north-west"
            title={"Step 1: Initial BFS with North West Corner method"}
        >
            <TransportTable
                demands={demandNodes}
                supplies={supplyNodes}
                cells={nwcMatrix}
            />
        </SolveSection>
    );
    setSteps((steps) => [...steps, nwcComp]);

    // ========================================
    // Least Cost
    // ========================================

    let leastCostMatrix = leastCost(costsArray, suppliesArray, demandsArray);
    let lcComp = (
        <SolveSection
            key="least-cost"
            title={"Step 1: Initial BFS with Least Cost method"}
        >
            <TransportTable
                demands={demandNodes}
                supplies={supplyNodes}
                cells={leastCostMatrix}
            />
        </SolveSection>
    );
    setSteps((steps) => [...steps, lcComp]);
    // setSteps((steps) => [...steps, leastCostMatrixStep]);
}

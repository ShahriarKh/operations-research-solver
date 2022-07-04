import SolveSection from "../Components/molecules/SolveSection";
import TransportTable from "../Components/molecules/TransportTable";
import { checkBalance } from "./Transportation/checkBalance";
import { createCostMatrix } from "./Transportation/createMatrix";
import { leastCost } from "./Transportation/leastCost";
import { northWestCorner } from "./Transportation/northWestCorner";

export function solveTransportation(
    data,
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

    // ========================================
    // Get supplies and demadns from form data
    // ========================================

    let suppliesObject = Object.fromEntries(
        Object.entries(data).filter(([key]) => supplyRegex.test(key))
    );

    let demandsObject = Object.fromEntries(
        Object.entries(data).filter(([key]) => demandRegex.test(key))
    );

    let costsObject = Object.fromEntries(
        Object.entries(data).filter(([key]) => costRegex.test(key))
    );

    // ========================================
    // Create arrays from objects
    // ========================================

    let suppliesArray = Object.keys(suppliesObject).map((key) =>
        Number(suppliesObject[key])
    );

    let demandsArray = Object.keys(demandsObject).map((key) =>
        Number(demandsObject[key])
    );

    // const costsArray = Object.keys(costsObject).map((key) =>
    //     Number(costsObject[key])
    // );
    // const total = suppliesArray.reduce((a, b) => a + b, 0);

    let suppliesCount = suppliesArray.length;
    let demandsCount = demandsArray.length;

    let suppliesSum = suppliesArray.reduce((a, b) => a + b, 0);
    let demandsSum = demandsArray.reduce((a, b) => a + b, 0);

    // ========================================
    // Check Problem Balance
    // ========================================

    const balanceStep = checkBalance(suppliesSum, demandsSum);
    setSteps((steps) => [...steps, balanceStep]);

    // console.log(suppliesObject, demandsObject, costsObject, suppliesArray, demandsArray);

    // ========================================
    // Create Cost Matrix
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

    // let leastCostMatrix = leastCost(costMatrix, suppliesArray, demandsArray);
    // let lcComp = (
    //     <SolveSection
    //         key="least-cost"
    //         title={"Step 1: Initial BFS with Least Cost method"}
    //     >
    //         <TransportTable
    //             demands={demandNodes}
    //             supplies={supplyNodes}
    //             cells={leastCostMatrix}
    //         />
    //     </SolveSection>
    // );
    // setSteps((steps) => [...steps, lcComp]);
    // setSteps((steps) => [...steps, leastCostMatrixStep]);
}

import { checkBalance } from "./Transportation/checkBalance";
import { createCostMatrix, createMatrix } from "./Transportation/createMatrix";

export function solveTransportation(data, steps, setSteps) {
    // ========================================
    // Get Supply and Demand values from inputs
    // ========================================

    const supplyRegex = /^s\d*$/;
    const demandRegex = /^d\d*$/;
    const costRegex   = /^s.*d\d*$/;

    const supplies = Object.fromEntries(
        Object.entries(data).filter(([key]) => supplyRegex.test(key))
    );

    const demands = Object.fromEntries(
        Object.entries(data).filter(([key]) => demandRegex.test(key))
    );

    const costs = Object.fromEntries(
        Object.entries(data).filter(([key]) => costRegex.test(key))
    );

    const suppliesCount = Object.keys(supplies).length;
    const demandsCount = Object.keys(demands).length;

    // ========================================
    // Check Problem Balance
    // ========================================

    const balanceStep = checkBalance(supplies, demands);
    setSteps((steps) => [...steps, balanceStep]);

    // ========================================
    // Create Matrix
    // ========================================

    const { matrix, matrixStep } = createMatrix(suppliesCount, demandsCount);
    setSteps((steps) => [...steps, matrixStep]);

    // alert(matrix)

    const { costMatrix, costMatrixStep } = createCostMatrix(costs, suppliesCount, demandsCount)
    setSteps((steps) => [...steps, costMatrixStep]);

    // alert(costMatrix)
}

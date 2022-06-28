import { isBalanced } from "./Transportation/checkBalance"

export function solveTransportation(data) {

    // ========================================
    // Get Supply and Demand values from inputs
    // ========================================

    const supplyRegex = /^s\d*$/
    const demandRegex = /^d\d*$/

    const supplies = Object.fromEntries(
        Object.entries(data).filter(([key]) => supplyRegex.test(key)
    ))

    const demands = Object.fromEntries(
        Object.entries(data).filter(([key]) => demandRegex.test(key)
    ))

    // ========================================
    // Check Problem Balance
    // ========================================
    
    isBalanced(supplies, demands) ? console.log("yes") : console.log("no");

}

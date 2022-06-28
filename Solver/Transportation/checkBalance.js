import SolveSection from "../../Components/molecules/SolveSection";

export function checkBalance(supplies, demands) {
    const suppliesSum = Object.values(supplies).reduce((accumulator, value) => {
        return parseInt(accumulator) + parseInt(value);
    }, 0);

    const demandsSum = Object.values(demands).reduce((accumulator, value) => {
        return parseInt(accumulator) + parseInt(value);
    }, 0);

    let component;
    const supplyMinusDemand = suppliesSum - demandsSum;

    if (supplyMinusDemand === 0) {
        component = <div>Problem is Balanced.</div>;
    } else {
        component = (
            <div>
                Problem is not balanced. <br />
                Demand: {demandsSum}, Supply: {suppliesSum} <br />
                You need to add a dummy{" "}
                {supplyMinusDemand > 0 ? "Demand" : "Supply"} node with value of{" "}
                {Math.abs(supplyMinusDemand)}
            </div>
        );
    }

    return <SolveSection title={"Step 1: Problem Balance"}>{component}</SolveSection>;
}

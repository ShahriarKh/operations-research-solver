import SolveSection from "../../Components/molecules/SolveSection";

export function checkBalance(suppliesSum, demandsSum) {
    // const suppliesSum = Object.values(supplies).reduce((accumulator, value) => {
    //     return parseInt(accumulator) + parseInt(value);
    // }, 0);

    // const demandsSum = Object.values(demands).reduce((accumulator, value) => {
    //     return parseInt(accumulator) + parseInt(value);
    // }, 0);

    let component;
    const supplyMinusDemand = suppliesSum - demandsSum;

    if (supplyMinusDemand === 0) {
        component = <div>Supply = Demand = {suppliesSum}, Problem is Balanced.</div>;
    } else {
        component = (
            <div>
                Problem is{" "}
                <span style={{ color: "#ff595ff0" }}>not balanced</span>.<br />
                Supply: {suppliesSum} <br />
                Demand: {demandsSum} <br />
                Difference: {Math.abs(supplyMinusDemand)}
                {/* You need to add a dummy{" "} */}
                {/* {supplyMinusDemand > 0 ? "Demand" : "Supply"} node with value of{" "} */}
                {/* {Math.abs(supplyMinusDemand)} */}
            </div>
        );
    }

    return (
        <SolveSection key="step1" title={"Step 0: Check Balance"}>{component}</SolveSection>
    );
}

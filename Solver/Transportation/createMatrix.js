import SolveSection from "../../Components/molecules/SolveSection";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

export function createMatrix(supplies, demands) {

    const suppliesCount = Object.keys(supplies).length;
    const demandsCount = Object.keys(demands).length;

    const matrix = math.zeros(suppliesCount, demandsCount);

    return (
        <SolveSection title={"Step 2: Matrix"}>
            {JSON.stringify(supplies)}
            {JSON.stringify(demands)}
            <p>{JSON.stringify(matrix._data)}</p>
        </SolveSection>
    );
}

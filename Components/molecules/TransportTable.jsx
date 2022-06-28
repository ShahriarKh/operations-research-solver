import css from "./TransportTable.module.scss";
import { useFormContext } from "react-hook-form";

export default function TransportTable({ supplies, demands, cells }) {
    const { watch } = useFormContext();

    return (
        <table className={css.table}>
            <tbody>
                <tr key={"demands"}>
                    <td></td>
                    {demands.map((demand, i) => {
                        return (
                            <td key={`demand label ${i}`}>Demand {i + 1}</td>
                        );
                    })}
                </tr>

                {supplies.map((supply, i) => {
                    return (
                        <tr key={`row ${i}`}>
                            <td key={`supply label ${i}`}>Supply {i + 1}</td>
                            {demands.map((demands, j) => {
                                return (
                                    <td
                                        key={`cell ${i},${j}`}
                                        className={css.cell}
                                    >
                                        0{" "}
                                        <span className={css.cellCost}>
                                            {watch(`s${i + 1}-d${j + 1}`)}
                                        </span>
                                    </td>
                                );
                            })}
                            <td key={`supply ${i}`}>{watch(supply)}</td>
                        </tr>
                    );
                })}

                <tr>
                    <td></td>
                    {demands.map((demand, j) => {
                        return <td key={`demand ${j}`}>{watch(demand)}</td>;
                    })}
                </tr>
            </tbody>
        </table>
    );
}

import css from "./TransportTable.module.scss";
import { useFormContext } from "react-hook-form";

export default function TransportTable({ supplies, demands, cells }) {
    const { watch } = useFormContext();

    return (
        <table className={css.table}>
            <tbody>
                <tr>
                    <td></td>
                    {demands.map((demand, i) => {
                        return <td>Demand {i + 1}</td>;
                    })}
                </tr>
                {supplies.map((supply, i) => {
                    return (
                        <tr>
                            <td>Supply {i + 1}</td>
                            {demands.map((demands, j) => {
                                return (
                                    <td className={css.cell}>
                                        0{" "}
                                        <span className={css.cellCost}>
                                            {watch(`s${i + 1}-d${i + 1}`)}
                                        </span>
                                    </td>
                                );
                            })}
                            <td>{watch(supply)}</td>
                        </tr>
                    );
                })}
                <tr>
                    <td></td>
                    {demands.map((demand) => {
                        return <td>{watch(demand)}</td>;
                    })}
                </tr>
            </tbody>
        </table>
    );
}

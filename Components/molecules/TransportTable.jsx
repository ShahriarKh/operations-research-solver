import css from "./TransportTable.module.scss";
import { useFormContext } from "react-hook-form";

export default function TransportTable({ demands, supplies, cells, tableKey }) {
    const { watch } = useFormContext();

    return (
        <>
            {/* <p>{JSON.stringify(cells)}</p> */}
            <table className={css.table}>
                <tbody>
                    <tr key={"demands" + tableKey}>
                        <td></td>
                        {demands.map((demand) => {
                            return (
                                <td key={demand.data.label + tableKey}>
                                    {demand.data.label}
                                </td>
                            );
                        })}
                    </tr>

                    {supplies.map((supply, i) => {
                        return (
                            <tr key={`row ${supply.id}`}>
                                <td key={supply.data.label + tableKey}>
                                    {supply.data.label}
                                </td>
                                {demands.map((demand, j) => {
                                    return (
                                        <td
                                            key={`cell ${supply.id},${demand.id} ${tableKey}`}
                                            className={css.cell}
                                        >
                                            {(cells && cells.get(i, j)) || 0}
                                            <span className={css.cellCost}>
                                                {/* not the correct way to do this */}
                                                {watch(
                                                    `${supply.id}-${demand.id}`
                                                ) || 1}
                                            </span>
                                        </td>
                                    );
                                })}
                                <td key={supply.id + tableKey}>
                                    {watch(supply.id)}
                                </td>
                            </tr>
                        );
                    })}

                    <tr>
                        <td></td>
                        {demands.map((demand) => {
                            return (
                                <td key={demand.id + tableKey}>
                                    {watch(demand.id)}
                                </td>
                            );
                        })}
                    </tr>
                </tbody>
            </table>
        </>
    );
}

import css from "./TransportTable.module.scss";
import { useFormContext } from "react-hook-form";

export default function TransportTable({ demands, supplies }) {
    const { watch } = useFormContext();

    return (
        <table className={css.table}>
            <tbody>
                <tr key={"demands"}>
                    <td></td>
                    {demands.map((demand) => {
                        return (
                            <td key={demand.data.label}>{demand.data.label}</td>
                        );
                    })}
                </tr>

                {supplies.map((supply) => {
                    return (
                        <tr key={`row ${supply.id}`}>
                            <td key={supply.data.label}>{supply.data.label}</td>
                            {demands.map((demand) => {
                                return (
                                    <td
                                        key={`cell ${supply.id},${demand.id}`}
                                        className={css.cell}
                                    >
                                        0
                                        <span className={css.cellCost}>
                                            {/* not the correct way to do this */}
                                            {watch(`${supply.id}-${demand.id}`) || 1}
                                        </span>
                                    </td>
                                );
                            })}
                            <td key={supply.id}>{watch(supply.id)}</td>
                        </tr>
                    );
                })}

                <tr>
                    <td></td>
                    {demands.map((demand) => {
                        return <td key={demand.id}>{watch(demand.id)}</td>;
                    })}
                </tr>
            </tbody>
        </table>
    );
}

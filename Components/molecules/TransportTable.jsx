import css from "./TransportTable.module.scss";
import { useFormContext } from "react-hook-form";

export default function TransportTable({ supplies, demands, cells }) {
    const { watch } = useFormContext();

    return (
        <>
            {demands.map((demand) => {
                return <p>{watch(demand)}</p>;
            })}

            {supplies.map((supply) => {
                return <p>{watch(supply)}</p>;
            })}
            {/* <table>
            <tbody>
                <tr>
                    {cells && cells.map((cell) => {
                        return <td>{cell.value}</td>;
                    })}
                    <td>{watch("s1-d1")}</td>
                    <td>{watch("s2-d1")}</td>
                </tr>
            </tbody>
        </table> */}
        </>
    );
}

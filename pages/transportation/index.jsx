// import css from './index.module.scss'
import { matrix, size } from "mathjs";
import { useState } from "react";

const damn = matrix([
    [0, 1],
    [10, 9],
    [13, 40],
]); // Matrix



export default function index(params) {
    // const [cells, setCells] = useState(damn);

    function updateCells(i, j, newValue) {
        damn._data[i][j] = newValue
        console.log(damn._data);
    }

    return (
        <table>
            <tbody>
                {damn._data.map((row, i = index) => {
                    return (
                        <tr key={`row ${i}`}>
                            {row.map((cell, j = index) => {
                                return (
                                    <td key={`cell ${j}`}>
                                        <input
                                            type="number"
                                            min="0"
                                            onChange={(e) =>
                                                updateCells(
                                                    i,
                                                    j,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

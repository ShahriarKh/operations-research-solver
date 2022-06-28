import { useState, useCallback, useMemo } from "react";
import ReactFlow, {
    Background,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    useNodesState,
    useEdgesState,
} from "react-flow-renderer";
import {
    useForm,
    FormProvider,
    useFormContext,
    useWatch,
} from "react-hook-form";
import SupplyNode from "../../Components/atomes/SupplyNode";
import DemandNode from "../../Components/atomes/DemandNode";
import CustomEdge from "../../Components/atomes/CustomEdge";
import TransportTable from "../../Components/molecules/TransportTable";
import css from "./style.module.scss"

const initialNodes = [
    {
        id: "s1",
        data: { label: "Supply 1" },
        position: {
            x: 0,
            y: 0,
        },
        type: "supply",
    },

    {
        id: "s2",
        data: { label: "Supply 2" },
        position: {
            x: 0,
            y: 100,
        },
        type: "supply",
    },

    {
        id: "d1",
        data: { label: "Demand 1" },
        position: {
            x: 260,
            y: 0,
        },
        type: "demand",
    },
];

const initialEdges = [
    {
        id: "s1-d1",
        source: "s1",
        target: "d1",
        // label: "12",
        type: "customedge",
    },
    {
        id: "s2-d1",
        source: "s2",
        target: "d1",
        // label: "45",
        type: "customedge",
    },
];

const graphOptions = {
    panOnDrag: false,
    zoomOnScroll: false,
    zoomOnPinch: false,
    // zoom
    snapToGrid: true,
    snapGrid: [60, 60],
    nodesDraggable: false,
    maxZoom: 1,
};

export default function Home() {
    const methods = useForm();
    const onSumbit = (data) => alert(data);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const nodeTypes = useMemo(
        () => ({ supply: SupplyNode, demand: DemandNode }),
        []
    );

    const edgeTypes = useMemo(() => ({ customedge: CustomEdge }), []);

    const onConnect = useCallback(
        (connection) =>
            setEdges((eds) =>
                addEdge({ ...connection, type: "customedge" }, eds)
            ),
        [setEdges]
    );

    return (
        <FormProvider {...methods}>
            <div style={{ height: "400px", width: "100%" }}>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    edgeTypes={edgeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    {...graphOptions}
                    fitView
                >
                    <Background />
                </ReactFlow>
            </div>
            <div className={css.solver}>
                <h2>Table Form</h2>
                <TransportTable supplies={["s1", "s2"]} demands={["d1"]} />
            </div>
        </FormProvider>
    );
}

// // import css from './index.module.scss'
// import { matrix, size } from "mathjs";
// import { useState } from "react";

// const damn = matrix([
//     [0, 1],
//     [10, 9],
//     [13, 40],
// ]); // Matrix

// export default function index(params) {
//     // const [cells, setCells] = useState(damn);

//     function updateCells(i, j, newValue) {
//         damn._data[i][j] = newValue;
//         console.log(damn._data);
//     }

//     return (
//         <table>
//             <tbody>
//                 {damn._data.map((row, i = index) => {
//                     return (
//                         <tr key={`row ${i}`}>
//                             {row.map((cell, j = index) => {
//                                 return (
//                                     <td key={`cell ${j}`}>
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             onChange={(e) =>
//                                                 updateCells(
//                                                     i,
//                                                     j,
//                                                     e.target.value
//                                                 )
//                                             }
//                                         />
//                                     </td>
//                                 );
//                             })}
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </table>
//     );
// }

import { useState, useCallback, useMemo, useRef } from "react";
import ReactFlow, {
    Background,
    Controls,
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
import css from "./style.module.scss";

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

    {
        id: "d2",
        data: { label: "Demand 2" },
        position: {
            x: 260,
            y: 100,
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
    {
        id: "s1-d2",
        source: "s1",
        target: "d2",
        // label: "12",
        type: "customedge",
    },
    {
        id: "s2-d2",
        source: "s2",
        target: "d2",
        // label: "45",
        type: "customedge",
    },
];

const graphOptions = {
    // panOnDrag: false,
    // zoomOnScroll: false,
    // zoomOnPinch: false,
    // zoom
    snapToGrid: true,
    snapGrid: [60, 60],
    // nodesDraggable: false,
    maxZoom: 1,
    panOnScrollMode: "vertical",
};

export default function Home() {
    const methods = useForm();

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const [supplies, setSupplies] = useState(["s1", "s2"]);
    const [demands, setDemands] = useState(["d1", "d2"]);

    const nodeTypes = useMemo(
        () => ({ supply: SupplyNode, demand: DemandNode }),
        []
    );

    const edgeTypes = useMemo(() => ({ customedge: CustomEdge }), []);

    const onConnect = useCallback(
        (connection, source = supplies.length, target = demands.length) =>
            setEdges((edges) =>
                addEdge(
                    {
                        ...connection,
                        type: "customedge",
                        id: `s${source}-d${target}`,
                    },
                    edges
                )
            ),
        [setEdges]
    );

    function addSupply() {
        const y = supplies.length * 100;
        let supplyNumber = supplies.length + 1;

        const newSupply = {
            id: `s${supplyNumber}`,
            type: "supply",
            position: {
                x: 0,
                y: y,
            },
            data: { label: `Supply ${supplyNumber}` },
        };
        setSupplies((supplies) => supplies.concat(`s${supplyNumber}`));
        setNodes((nodes) => nodes.concat(newSupply));
    }

    function addDemand() {
        const y = demands.length * 100;
        let demandNumber = demands.length + 1;

        const newDemand = {
            id: `d${demandNumber}`,
            type: "demand",
            position: {
                x: 260,
                y: y,
            },
            data: { label: `Demand ${demandNumber}` },
        };
        setDemands((demands) => demands.concat(`d${demandNumber}`));
        setNodes((nodes) => nodes.concat(newDemand));
    }

    return (
        <FormProvider {...methods}>
            <div className={css.page}>
                <div className={css.graph} style={{}}>
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
                        <Controls />
                    </ReactFlow>
                    <div className={css.buttons}>
                        <button onClick={addSupply}>Add Supply</button>
                        <button onClick={addDemand}>Add Demand</button>
                    </div>
                </div>
                <div className={css.solver}>
                    <p>{JSON.stringify(demands)}</p>
                    <p>{JSON.stringify(supplies)}</p>
                    <h2>Table</h2>
                    <TransportTable supplies={supplies} demands={demands} />
                </div>
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

import { useState, useCallback, useMemo, createElement } from "react";
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    // applyEdgeChanges,
    // applyNodeChanges,
    useNodesState,
    useEdgesState,
    // ReactFlowProvider,
} from "react-flow-renderer";
import {
    useForm,
    FormProvider,
    // useFormContext,
    // useWatch,
} from "react-hook-form";
import SupplyNode from "../../Components/atomes/SupplyNode";
import DemandNode from "../../Components/atomes/DemandNode";
import CustomEdge from "../../Components/atomes/CustomEdge";
import TransportTable from "../../Components/molecules/TransportTable";
import css from "./style.module.scss";
import SolveSection from "../../Components/molecules/SolveSection";

import { solveTransportation } from "../../Solver/solveTransportation";

const supplyX = 0;
const supplyYIncrease = 100;
const demandX = 400;
const demandYIncrease = 100;
const demandXIncrease = 100;

const initialNodes = [
    {
        id: "s1",
        data: { label: "Supply 1" },
        position: {
            x: supplyX,
            y: 0,
        },
        type: "supply",
    },

    {
        id: "s2",
        data: { label: "Supply 2" },
        position: {
            x: supplyX,
            y: supplyYIncrease,
        },
        type: "supply",
    },

    {
        id: "d1",
        data: { label: "Demand 1" },
        position: {
            x: demandX,
            y: 0,
        },
        type: "demand",
    },

    {
        id: "d2",
        data: { label: "Demand 2" },
        position: {
            x: demandX + demandXIncrease,
            y: demandYIncrease,
        },
        type: "demand",
    },
];

const initialEdges = [
    {
        id: "s1-d1",
        source: "s1",
        target: "d1",
        type: "customedge",
        hidden: false,
    },
    {
        id: "s2-d1",
        source: "s2",
        target: "d1",
        type: "customedge",
        hidden: false,
    },
    {
        id: "s1-d2",
        source: "s1",
        target: "d2",
        type: "customedge",
        hidden: false,
    },
    {
        id: "s2-d2",
        source: "s2",
        target: "d2",
        type: "customedge",
        hidden: false,
    },
];

const graphOptions = {
    // panOnDrag: false,
    // zoomOnScroll: false,
    // zoomOnPinch: false,
    // zoom
    // snapToGrid: true,
    // snapGrid: [20, 20],
    // nodesDraggable: false,
    maxZoom: 1,
    panOnScrollMode: "vertical",
};

export default function Home() {
    const methods = useForm({
        mode: "onSubmit",
        reValidateMode: "onSubmit"
    });

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const supplies = nodes.filter((node) => node.id.charAt(0) == "s");
    const demands = nodes.filter((node) => node.id.charAt(0) == "d");

    const [lastSupply, setLastSupply] = useState(supplies.length);
    const [lastDemand, setLastDemand] = useState(demands.length);

    const nodeTypes = useMemo(
        () => ({ supply: SupplyNode, demand: DemandNode }),
        []
    );

    const edgeTypes = useMemo(() => ({ customedge: CustomEdge }), []);

    const onConnect = useCallback(
        (connection) =>
            setEdges((edges) =>
                addEdge(
                    {
                        ...connection,
                        type: "customedge",
                        id: `${connection.source}-${connection.target}`,
                        hidden: false,
                    },
                    edges
                )
            ),
        [setEdges]
    );

    function addSupply() {
        const y = lastSupply * supplyYIncrease;
        let supplyNumber = lastSupply + 1;

        const newSupply = {
            id: `s${supplyNumber}`,
            type: "supply",
            position: {
                x: supplyX,
                y: y,
            },
            data: { label: `Supply ${supplyNumber}` },
        };

        setLastSupply(supplyNumber);
        setNodes((nodes) => nodes.concat(newSupply));

        demands.forEach((demand) =>
            setEdges((edges) =>
                addEdge(
                    {
                        type: "customedge",
                        source: `s${supplyNumber}`,
                        target: demand.id,
                        id: `s${supplyNumber}-${demand.id}`,
                        hidden: false,
                        zIndex: 0
                    },
                    edges
                )
            )
        );
    }

    function addDemand() {
        const y = lastDemand * demandYIncrease;
        const x = lastDemand * demandXIncrease + demandX;
        let demandNumber = lastDemand + 1;

        const newDemand = {
            id: `d${demandNumber}`,
            type: "demand",
            position: {
                x: x,
                y: y,
            },
            data: { label: `Demand ${demandNumber}` },
        };
        setLastDemand(demandNumber);
        setNodes((nodes) => nodes.concat(newDemand));

        supplies.forEach((supply) =>
            setEdges((edges) =>
                addEdge(
                    {
                        type: "customedge",
                        source: supply.id,
                        target: `d${demandNumber}`,
                        id: `${supply.id}-d${demandNumber}`,
                        hidden: false,
                        zIndex: 0
                    },
                    edges
                )
            )
        );
    }

    const [steps, setSteps] = useState([]);

    const onSubmit = (data) => {
        setSteps([]);
        solveTransportation(data, steps, setSteps);
    };

    const onChange = (changes) => {
        const selectionChange = changes.find((change) => change.type === "select");
        if (selectionChange) {
          setEdges((currentEdges) => {
            return currentEdges.map((edge) => {
              if (edge.id === selectionChange.id) return edge;
              return {
                ...edge,
                hidden: selectionChange.selected
              };
            });
          });
        }
        onEdgesChange(changes);
      };

    return (
        <>
            <FormProvider {...methods}>
                <div className={css.page}>
                    <div className={css.graph} style={{}}>
                        {/* <ReactFlowProvider> */}
                        <ReactFlow
                            nodeTypes={nodeTypes}
                            edgeTypes={edgeTypes}
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onChange}
                            // onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            {...graphOptions}
                            fitView
                        >
                            <Background />
                            <Controls />
                        </ReactFlow>
                        {/* </ReactFlowProvider> */}
                        <div className={css.buttons}>
                            <button onClick={addSupply}>Add Supply</button>
                            <button onClick={addDemand}>Add Demand</button>
                        </div>
                    </div>
                    <div className={css.solver}>
                        <SolveSection title="Table">
                            <TransportTable
                                supplies={supplies}
                                demands={demands}
                                nodes={nodes}
                            />
                        </SolveSection>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <input type="submit" />
                        </form>

                        {steps}

                        {console.log("steps" + steps)}
                    </div>
                </div>
            </FormProvider>
        </>
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

import { useState, useCallback, useMemo } from "react";
import ReactFlow, {
    Background,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    useNodesState,
    useEdgesState,
} from "react-flow-renderer";

import SupplyNode from "../Components/atomes/SupplyNode";
import DemandNode from "../Components/atomes/DemandNode";
import CustomEdge from "../Components/atomes/CustomEdge";

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
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const nodeTypes = useMemo(
        () => ({ supply: SupplyNode, demand: DemandNode }),
        []
    );

    const edgeTypes = useMemo(() => ({ customedge: CustomEdge }), []);

    // const onNodesChange = useCallback(
    //     (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    //     [setNodes]
    // );

    // const onEdgesChange = useCallback(
    //     (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    //     [setEdges]
    // );

    const onConnect = useCallback(
        (connection) =>
            setEdges((eds) => addEdge({ ...connection, type: "customedge" }, eds)),
        [setEdges]
    );

    return (
        <>
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
        </>
    );
}

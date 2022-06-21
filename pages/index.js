import { useState, useCallback, useMemo } from "react";
import ReactFlow, {
    Background,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
} from "react-flow-renderer";
import SupplyNode from "../Components/atomes/SupplyNode";
import DemandNode from "../Components/atomes/DemandNode";

const initialNodes = [
    {
        id: "s1",
        data: { label: "Supply 1" },
        position: {
            x: 0,
            y: 0,
        },
        type: 'supply'
    },

    {
        id: "s2",
        data: { label: "Supply 2" },
        position: {
            x: 0,
            y: 100,
        },
        type: 'supply'
    },

    {
        id: "d1",
        data: { label: "Demand 1" },
        position: {
            x: 260,
            y: 0,
        },
        type: 'demand'
    },
];

const initialEdges = [
    {
        id: "s1-d1",
        source: "s1",
        target: "d1",
    },
    {
        id: "s2-d1",
        source: "s2",
        target: "d1",
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
};



export default function Home() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const nodeTypes = useMemo(() => ({ supply: SupplyNode, demand: DemandNode }), []);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    return (
        <>
            <div style={{ height: "400px", width: "100%" }}>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    {...graphOptions}
                    fitView
                    maxZoom={1}
                >
                    <Background />
                </ReactFlow>
            </div>
        </>
    );
}

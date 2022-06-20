import { useState, useCallback } from "react";
import ReactFlow, {
    Background,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    
} from "react-flow-renderer";

const initialNodes = [
    {
        id: "s1",
        data: { label: <input /> },
        position: {
            x: 0,
            y: 0,
        },
    },

    {
        id: "s2",
        data: { label: "Supplier 2" },
        position: {
            x: 0,
            y: 200,
        },
    },

    {
        id: "d1",
        data: { label: "Demand 1" },
        position: {
            x: 200,
            y: 0,
        },
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
    snapToGrid: true,
    snapGrid: [60, 60],
    nodesDraggable: false
}

export default function Home() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

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
        <div style={{ height: "400px", width: "400px", background: "orange" }}>
            <ReactFlow
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
    );
}

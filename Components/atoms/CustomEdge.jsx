import css from "./CustomEdge.module.scss";
import { getBezierPath, getBezierEdgeCenter } from "react-flow-renderer";
import { useFormContext } from "react-hook-form";
import { useEffect, useRef } from "react";

const foreignObjectSize = 40;

export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}) {
    const { register, unregister } = useFormContext();

    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => {
            unregister(id);
            mounted.current = false;
        };
    }, []);

    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    const [centerX, centerY, offsetX, offsetY] = getBezierEdgeCenter({
        sourceX,
        sourceY,
        targetX,
        targetY,
        curvature: 0.25,
    });

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
                // ref={ref}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={centerX - foreignObjectSize / 2}
                y={centerY - foreignObjectSize / 3.5}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                {mounted.current && (
                    <input
                        className={css.cost}
                        {...register(id)}
                        defaultValue={1}
                    />
                )}
            </foreignObject>
        </>
    );
}

// function onEdgeClick(e, id) {
//     // e.stopPropagation();
// }

// const ref = createRef();
// const [coords, setCoords] = useState({ x: 0, y: 0 });

// useEffect(() => {
//     setCoords(ref.current.getPointAtLength(150));
// }, [sourceX, sourceY, targetX, targetY]);

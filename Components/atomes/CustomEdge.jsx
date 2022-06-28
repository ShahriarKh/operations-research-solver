import css from "./CustomEdge.module.scss";
import {
    getBezierPath,
    getEdgeCenter,
    getBezierEdgeCenter
    // getMarkerEnd,
    // getSmoothStepPath
} from "react-flow-renderer";
import { useFormContext } from "react-hook-form";

const foreignObjectSize = 40;

// function onEdgeClick(e, id) {
//     e.stopPropagation();
//     alert();
// }







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

    const { register } = useFormContext();

    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });


    // const edgePath = getSmoothStepPath({
    //     sourceX,
    //     sourceY,
    //     // sourcePosition: Position.Bottom, // optional
    //     targetX,
    //     targetY,
    //     // targetPosition = Position.Top, // optional
    //     borderRadius: 50, // optional
    //     // centerX, // optional
    //     // centerY, // optional
    //   })

    // const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    //     sourceX,
    //     sourceY,
    //     targetX,
    //     targetY,
    // });

    const [centerX, centerY, offsetX, offsetY] = getBezierEdgeCenter({
        sourceX,
        sourceY,
        // sourcePosition: Position.Bottom,
        targetX,
        targetY,
        // targetPosition: Position.Top,
        curvature: 0.75,
      })

    return (
        <>
            <path
                id={id}
                style={style}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={foreignObjectSize}
                height={foreignObjectSize}
                x={centerX - foreignObjectSize / 2}
                y={centerY - foreignObjectSize / 3.5}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                {/* <body> */}
                    <input className={css.cost} {...register(id)} />
                {/* </body> */}
            </foreignObject>
        </>
    );
}

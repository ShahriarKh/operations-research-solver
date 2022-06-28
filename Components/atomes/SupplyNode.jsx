import css from "./Node.module.scss";
import { Handle, Position, useReactFlow } from "react-flow-renderer";
// import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

export default function SupplyNode({ id, data }) {
    // const onChange = useCallback((e) => console.log(e.target.value), []);

    const { register } = useFormContext();
    const { setNodes } = useReactFlow();

    function remove() {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
    }

    // function hideOtherEdges() {
    //     const edges = getEdges();

    //     const hiddenEdges = edges.forEach((edge) => {
    //         if (edge.id != "s1-d1") {
    //             edge.hidden = true;
    //         }
    //     });

    //     setEdges(edges => hiddenEdges)
    // }

    return (
        <>
            <div className={css.box} 
            // onClick={hideOtherEdges}
            >
                <div className={css.header}>
                    <p>{data.label}</p>
                    <button onClick={remove} className={css.remove}>
                        <i className="ti ti-x" />
                    </button>
                </div>

                <input
                    // onChange={onChange}
                    className={css.input}
                    {...register(id)}
                    defaultValue={0}
                    type="number"
                    min={0}
                />

                {/* <p>{JSON.stringify(getEdges())}</p> */}
            </div>

            <Handle type="source" position={Position.Right} />
        </>
    );
}

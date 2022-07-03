import css from "./Node.module.scss";
import { Handle, Position, useReactFlow } from "react-flow-renderer";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function SupplyNode({ id, data }) {

    const { register, unregister } = useFormContext();
    const { setNodes } = useReactFlow();

    // This is required, so the unregistered input doesn't get registered again
    // https://react-hook-form.com/api/useform/unregister
    const [inputRegistered, setInputRegistered] = useState(true);

    function remove() {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        unregister(id);
        setInputRegistered(false)
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

                 {inputRegistered && (
                    <input
                        // onChange={onChange}
                        className={css.input}
                        {...register(id)}
                        defaultValue={0}
                        type="number"
                        min={0}
                        // inputmode="numeric" pattern="\d*"
                    />
                )}

                {/* <p>{JSON.stringify(getEdges())}</p> */}
            </div>

            <Handle type="source" position={Position.Right} />
        </>
    );
}
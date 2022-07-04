import css from "./Node.module.scss";
import { Handle, Position, useReactFlow } from "react-flow-renderer";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export default function DemandNode({ id, data }) {
    const { register, unregister } = useFormContext();
    const { setNodes, setEdges } = useReactFlow();

    // This is required, so the unregistered input doesn't get registered again
    // https://react-hook-form.com/api/useform/unregister
    const [inputRegistered, setInputRegistered] = useState(true);

    function remove() {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.target !== id));
        unregister(id);
        setInputRegistered(false);
    }

    return (
        <>
            <div className={css.box}>
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
            </div>
            <Handle type="target" position={Position.Left} />
        </>
    );
}

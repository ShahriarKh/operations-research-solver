import css from "./Node.module.scss";
import { Handle, Position, useReactFlow } from "react-flow-renderer";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

export default function DemandNode({ id, data }) {
    // const onChange = useCallback((e) => console.log(e.target.value), []);

    const { register } = useFormContext();
    const { setNodes } = useReactFlow();

    function remove() {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
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

                <input
                    // onChange={onChange}
                    className={css.input}
                    {...register(id)}
                    defaultValue={0}
                />
            </div>
            <Handle type="target" position={Position.Left} />
        </>
    );
}

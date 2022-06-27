import css from "./Node.module.scss";
import { Handle, Position } from "react-flow-renderer";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

export default function DemandNode({ id, data }) {
    const onChange = useCallback((e) => console.log(e.target.value), []);

    const { register } = useFormContext();

    return (
        <>
            <div className={css.box}>
                <p>{data.label}</p>
                <input
                    onChange={onChange}
                    className={css.input}
                    {...register(id)}
                />
            </div>
            <Handle type="target" position={Position.Left} />
        </>
    );
}

import css from "./Node.module.scss";
import { Handle, Position } from "react-flow-renderer";
import { useCallback } from "react";

export default function DemandNode({ data }) {
    const onChange = useCallback((e) => console.log(e.target.value), []);

    return (
        <>
            <div className={css.box}>
                <p>{data.label}</p>
                <input onChange={onChange} className={css.input} />
            </div>
            <Handle type="target" position={Position.Left} />
        </>
    );
}

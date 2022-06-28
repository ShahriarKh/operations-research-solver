import css from "./SolveSection.module.scss";

export default function SolveSection({ title, children }) {
    return (
        <div className={css.section}>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

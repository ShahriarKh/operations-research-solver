import css from './AppLayout.module.scss'

export default function AppLayout({children}) {
    return (
        <div className={css.grid}>{children}</div>
    )
}
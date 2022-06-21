import Link from "next/link";
import css from "./Sidebar.module.scss";

export default function Sidebar(params) {
    const pages = [
        { link: "/", label: "Home", icon: "home" },
        { link: "/transportation", label: "Transportation", icon: "route" },
        { link: "/transportation", label: "Transshipment", icon: "sitemap" },
        { link: "/graphical", label: "Graphical", icon: "chart-dots" },
    ];

    return (
        <div className={css["sidebar"]}>
            <nav>
                <ul>
                    {pages.map((page) => {
                        return (
                            <li>
                                <Link href={page.link}>
                                    <a>
                                        <i class={`ti ti-${page.icon}`} />
                                        {page.label}
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

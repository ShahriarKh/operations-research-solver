import Link from "next/link";
import NextNavLink from "../NextNavlink";
import css from "./Sidebar.module.scss";

export default function Sidebar(params) {
    const pages = [
        { link: "/", label: "Home", icon: "home" },
        { link: "/transportation", label: "Transportation", icon: "route" },
        { link: "/transshipment", label: "Transshipment", icon: "sitemap" },
        { link: "/graphical", label: "Graphical", icon: "chart-dots" },
    ];

    return (
        <div className={css["sidebar"]}>
            <nav>
                <ul>
                    {pages.map((page) => {
                        return (
                            <li>
                                <NextNavLink href={page.link} activeClassName={css.active}>
                                    <a>
                                        <i class={`ti ti-${page.icon}`} />
                                        {page.label}
                                    </a>
                                </NextNavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}

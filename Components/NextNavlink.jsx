// next.js link with active classname
import Link from "next/link";
import { useRouter } from "next/router";
import { cloneElement } from "react";

export default function NextNavLink({ href, children, activeClassName }) {
   const router = useRouter();
   let className = children.props.className || "";

   if (router.pathname === href) {
      className = `${className} ${activeClassName}`;
   }

   return (
      <Link href={href}>{cloneElement(children, { className })}</Link>
   );
}
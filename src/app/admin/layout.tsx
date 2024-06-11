import Navbar from "@/components/Navbar";
import NavLink from "@/components/NavLink";
import { ModeToggle } from "@/components/ThemeToggle";

import { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return (
    <>
      <Navbar>
        <NavLink href={"/admin"}>Admin</NavLink>
        <NavLink href={"/admin/products"}>Products</NavLink>
        <NavLink href={"/admin/customers"}>Products</NavLink>
        <NavLink href={"/admin/sales"}>Sales</NavLink>
        <ModeToggle />
      </Navbar>
      <div className="container p-6">{children}</div>
    </>
  );
}

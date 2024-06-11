
import { ReactNode } from "react";

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="ext-primary-foreground flex justify-end items-center gap-2  px-4">
      {children}
    </nav>
  );
};

export default Navbar;

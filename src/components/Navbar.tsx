
import { ReactNode } from "react";

const Navbar = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="ext-primary-foreground flex justify-end items-center   px-4">
      {children}
    </nav>
  );
};

export default Navbar;

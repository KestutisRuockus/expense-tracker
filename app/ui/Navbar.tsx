"use client";

import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const routeName = pathname.split("/");

  return (
    <nav className="w-full px-6 py-2 bg-backgroundSecondary font-700 text-xl text-titleText capitalize">
      {routeName.length === 2 ? "Home" : routeName[routeName.length - 1]}
    </nav>
  );
};

export default Navbar;

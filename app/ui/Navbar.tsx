"use client";

import { usePathname, useSearchParams } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const routerParts = pathname.split("/").filter(Boolean);
  const lastPart = routerParts[routerParts.length - 1];
  const isUpdade = searchParams.get("isUpdate");

  let pageTitle = "Home";
  if (isUpdade) {
    pageTitle = "Update";
  } else if (lastPart) {
    pageTitle = lastPart;
  }

  return (
    <nav className="w-full px-6 py-2 bg-backgroundSecondary font-700 text-xl text-titleText capitalize">
      {pageTitle}
    </nav>
  );
};

export default Navbar;

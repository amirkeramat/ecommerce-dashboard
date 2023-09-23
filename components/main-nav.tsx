"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { MenuIcon, X } from "lucide-react";
const MainNav = ({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();
  const [toggle, setToggle] = useState(false);
  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/banners`,
      label: "Banners",
      active: pathname === `/${params.storeId}/banners`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/categories`,
      label: "Categories",
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      href: `/${params.storeId}/sizes`,
      label: "Sizes",
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      href: `/${params.storeId}/colors`,
      label: "Colors",
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      href: `/${params.storeId}/products`,
      label: "Products",
      active: pathname === `/${params.storeId}/products`,
    },
    {
      href: `/${params.storeId}/orders`,
      label: "Orders",
      active: pathname === `/${params.storeId}/orders`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];

  return (
    <nav className="w-full">
      <MenuIcon
        onClick={() => setToggle(true)}
        className="block  cursor-pointer ms-auto"
      />
      <div
        onClick={() => setToggle(false)}
        className={`fixed bg-black/25 inset-0 z-40 ${
          toggle ? "block" : "hidden"
        } `}
      />
      <div
        className={`
          flex flex-col items-end space-y-6  overflow-y-auto   fixed right-0 top-0 bottom-0 z-50 bg-white dark:bg-zinc-900 mx-0 duration-300 ${
            toggle ? "w-[200px]" : "w-0"
          }`}
      >
        <X
          onClick={() => setToggle(false)}
          className="w-6 h-6 m-4 cursor-pointer"
        />
        {routes.map((route) => (
          <Link
            onClick={() => setToggle(false)}
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary px-4 pt-2",
              route.active
                ? "text-black font-bold underline underline-offset-8 dark:text-white"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MainNav;

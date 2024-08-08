"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MdGroups, MdSpaceDashboard } from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { FaGear, FaRegCreditCard } from "react-icons/fa6";
import { Text } from "@radix-ui/themes";

interface SideBarMenu {
  label: string;
  href: string;
  icon?: JSX.Element;
}

const sidebarMenu: SideBarMenu[] = [
  {
    label: "Groups",
    href: "/dashboard/groups",
    icon: <MdGroups className="text-xl font-bold" />,
  },
  {
    label: "Activity",
    href: "/dashboard/activity",
    icon: <RxActivityLog className="text-md font-bold" />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <FaGear className="text-md font-bold" />,
  },
];

export default function FooterMenu() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0  border-t py-3 block md:hidden bg-white shadow-lg z-50">
      <nav className="container mx-auto flex items-center justify-between">
        {sidebarMenu.map((menu, index) => (
          <div
            className={`${
              pathname === menu.href
                ? "text-green-600 hover:text-green-600"
                : "text-slate-600 hover:text-green-600"
            }`}
            key={index}
          >
            <Link
              href={menu.href}
              className="pointer flex flex-col items-center"
            >
              {menu.icon}
              <span className="mt-1 text-xs">{menu.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}

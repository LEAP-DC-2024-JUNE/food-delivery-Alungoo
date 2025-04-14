"use client";

import { LayoutDashboard, Settings, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminLogo from "@/svg/AdminLogo";

const SideMenu = () => {
  const pathname = usePathname();

  return (
    <div className="w-[167px] min-h-screen bg-white flex flex-col items-center gap-6 fixed left-0 top-0 bottom-0 p-5">
      <div className="mb-6 pr-4">
        <AdminLogo />
      </div>

      <Link href="/food-menu">
        <Button
          variant="ghost"
          className={`rounded-full flex items-center gap-2 ${
            pathname === "/food-menu" ? "bg-black text-white" : ""
          }`}
        >
          <LayoutDashboard size={18} />
          <span>Food Menu</span>
        </Button>
      </Link>

      <Link href="/orders">
        <Button
          variant="ghost"
          className={`rounded-full flex items-center gap-2 ${
            pathname === "/orders" ? "bg-black text-white" : ""
          }`}
        >
          <Truck size={18} />
          <span>Orders</span>
        </Button>
      </Link>

      <Link href="/settings">
        <Button
          variant="ghost"
          className={`rounded-full flex items-center gap-2 ${
            pathname === "/settings" ? "bg-black text-white" : ""
          }`}
        >
          <Settings size={18} />
          <span>Settings</span>
        </Button>
      </Link>
    </div>
  );
};

export default SideMenu;

import HeaderLogo from "@/svg/HeaderLogo";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Header = () => {
  return (
    <div className=" bg-[#18181B] w-full h-[68px] flex items-center">
      <div className=" min-w-[1264px] flex flex-row justify-between">
        <div className=" px-[225px]">
          <HeaderLogo />
        </div>
        <div className=" flex gap-5">
          <Button className=" bg-white rounded-3xl">
            <Link href="/">Sign up</Link>
          </Button>
          <Button className=" bg-red-700 rounded-3xl text-white">
            <Link href="/">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;

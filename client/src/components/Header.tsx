import HeaderLogo from "@/svg/HeaderLogo";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const Header = () => {
  return (
    <div className=" bg-[#18181B] w-full flex justify-between  px-[200px] py-3">
      <div className=" ">
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
  );
};

export default Header;

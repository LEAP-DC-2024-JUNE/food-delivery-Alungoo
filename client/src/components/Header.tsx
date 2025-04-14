"use client";
import HeaderLogo from "@/svg/HeaderLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, ShoppingCart, User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FoodSheet } from "./FoodSheet";

const Header = () => {
  return (
    <div className="bg-[#18181B] w-full flex justify-center">
      <div className="w-full max-w-screen-xl lg:w-[1264px] flex justify-between py-3 items-center">
        <div className="">
          <HeaderLogo />
        </div>
        <div className="flex gap-3">
          <Button className="bg-white rounded-full hover:text-white">
            <MapPin size={36} color="red" />
            <span className="text-[#EF4444] font-normal">
              Delivery address:
            </span>
            <span className="font-normal text-[#71717A]">Add Location ›</span>
          </Button>
          <FoodSheet />

          <Link href="/">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="bg-[#EF4444] text-white rounded-full px-2.5 py-2 hover:bg-transparent">
                  <User size={20} />
                </TooltipTrigger>
                <TooltipContent className="bg-[#FFFFFF] rounded-3xl">
                  <div className="flex flex-col justify-center items-center gap-3 p-4 rounded-[12px]">
                    <strong className="text-[20px]">Test@gmail.com</strong>
                    <Button className="bg-[#F4F4F5] rounded-full font-medium">
                      Sign out
                    </Button>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

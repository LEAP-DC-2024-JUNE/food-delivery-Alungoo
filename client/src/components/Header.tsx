"use client";
import HeaderLogo from "@/svg/HeaderLogo";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FoodSheet } from "./FoodSheet";
import { DeliveryAddressInput } from "./DeliveryInputModal";

type DecodedToken = {
  id: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
};

const Header = () => {
  const [deliveryInput, setDeliveryInput] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const decodedToken: DecodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email);
      console.log("Decoded email:", decodedToken.email);
    } catch (err) {
      console.error("Token decode failed:", err);
    }
  }, []);
  const handleSignout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div className="bg-[#18181B] w-full flex justify-center">
      <div className="w-full max-w-screen-xl lg:w-[1264px] flex justify-between py-3 items-center">
        <div>
          <HeaderLogo />
        </div>
        <div className="flex gap-3">
          <Button
            className="bg-white rounded-full hover:text-white"
            onClick={() => setDeliveryInput(true)}
          >
            <MapPin size={36} color="red" />
            <span className="text-[#EF4444] font-normal">
              Delivery address:
            </span>
            <span className="font-normal text-[#71717A]">Add Location ›</span>
          </Button>
          <FoodSheet />
          {deliveryInput && (
            <DeliveryAddressInput
              open={deliveryInput}
              onOpenChange={setDeliveryInput}
            />
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="bg-[#EF4444] text-white rounded-full px-2.5 py-2 hover:bg-transparent">
                <User size={20} />
              </TooltipTrigger>
              <TooltipContent className="bg-[#FFFFFF] rounded-3xl text-black">
                <div className="flex flex-col justify-center items-center gap-4 p-4 rounded-[12px]">
                  <strong className="text-[16px]">
                    {userEmail || "Guest"}
                  </strong>
                  {userEmail ? (
                    <Link href="/login">
                      <Button
                        onClick={handleSignout}
                        className="rounded-full font-medium"
                      >
                        Sign out
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <Button className="rounded-full font-medium">
                        Log in
                      </Button>
                    </Link>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Header;

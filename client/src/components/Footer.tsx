import React from "react";
import FooterLogo from "@/svg/FooterLogo";
import FbLogo from "@/svg/FbLogo";
import InstaLogo from "@/svg/InstaLogo";

const Footer = () => {
  return (
    <div className=" bg-[#18181B] text-white w-full pb-12">
      <div className=" flex flex-col justify-center items-center ">
        <div className=" bg-[#EF4444] w-full overflow-hidden relative py-5 my-12">
          <div className=" flex animate-infinite-scroll ">
            {[...Array(6), ...Array(6)].map((_, index) => (
              <p
                key={index}
                className="text-white text-[30px] mx-[50px] whitespace-nowrap"
              >
                Fresh fast delivered
              </p>
            ))}
          </div>
        </div>

        <div className=" flex gap-[180px] ">
          <div>
            <FooterLogo />
          </div>
          <div className=" flex gap-[120px] flex-row ">
            <ul className=" cursor-pointer flex flex-col gap-2  text-[#FAFAFA] ">
              <li className="text-[#F4F4F566]">NOMNOM</li>
              <li className=" ">Home</li>
              <li>Contact us</li>
              <li>Delivery zone</li>
            </ul>
            <ul className=" flex flex-col gap-2 cursor-pointer">
              <li className="text-[#F4F4F566]">MENU</li>
              <li>Apperizers</li>
              <li>Salads</li>
              <li>Pizzas</li>
              <li>Lunch favorites</li>
              <li>Main dishes</li>
            </ul>
            <ul className="mt-8 cursor-pointer flex flex-col gap-2">
              <li>Side dish</li>
              <li>Brunch</li>
              <li>Salads</li>
              <li>Desserts</li>
              <li>Beverages</li>
              <li>Fish & Sea foods</li>
            </ul>
            <div className=" flex flex-col gap-2">
              <p className="text-[#F4F4F566]">FOLLOW US</p>
              <div className=" flex gap-2">
                <FbLogo />
                <InstaLogo />
              </div>
            </div>
          </div>
        </div>

        <div className=" border-[1px] w-[1264px] border-[#F4F4F566] my-10 "></div>
        <div className=" px-[80px]">
          <div className=" flex flex-row gap-10  text-[#F4F4F566]">
            <p>Copy right 2024 © NomNom LLC</p>
            <p>Privacy Policy</p>
            <p>Terms and condition</p>
            <p>Cookie Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

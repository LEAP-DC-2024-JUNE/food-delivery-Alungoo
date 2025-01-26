import React from "react"
import Marquee from "./Marquee";
import FooterLogo from "@/svg/FooterLogo";
import FbLogo from "@/svg/FbLogo";
import InstaLogo from "@/svg/InstaLogo";

const Footer = () => {
  return (
    <div className=" bg-black w-full h-[755px] ">
     <div className=" flex flex-col justify-center items-center ">
        <div className=" bg-red-600 animate-infinite-scroll">
            <p>Fresh Fast Delivered</p>
        </div>
        <div className=" flex flex-row justify-around">
          <div>
            <FooterLogo/>
          </div>
          <div className=" flex ">
            <ul className=" cursor-pointer ">
              <li>NOMNOM</li>
              <li>Home</li>
              <li>Contact us</li>
              <li>Delivery zone</li>
            </ul>
            <ul>
             <li>MENU</li>
              <li>Apperizers</li>
              <li>Salads</li>
              <li>Pizzas</li>
              <li>Lunch favorites</li>
              <li>Main dishes</li>
            </ul>
            <ul>
              <li>Side dish</li>
              <li>Brunch</li>
              <li>Salads</li>
              <li>Desserts</li>
              <li>Beverages</li>
              <li>Fish & Sea foods</li>
            </ul>
            <div>
              <p>FOLLOW US</p>
                <div>
                <FbLogo/>
                <InstaLogo/>
              </div>
            </div>
          </div>

        </div>
          <div className=" border-[1px] w-[1440px] border-black">

          </div>
          <div className=" flex flex-row gap-6">
            <p>Copy right 2024</p>
            <p>© NomNom LLC</p>
            <p>Privacy Policy</p>
            <p>Terms and condition</p>
            <p>Cookie Policy</p>
          </div>
      </div>
    </div>
  )
}

export default Footer;

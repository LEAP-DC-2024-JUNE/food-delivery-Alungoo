"use client";
import hero2 from "../Images/hero2.png";
import Footer from "@/components/Footer";

import Header from "@/components/Header";
import Image from "next/image";
import FoodContainer from "@/components/FoodContainer";
import React from "react";
import { CarouselBadges } from "@/components/Carousel";
import useSWR from "swr";
import { fetchFoodData } from "@/utils/fetchFoodData";

const Home = () => {
  const {
    data: groupedFood,
    error,
    isLoading,
  } = useSWR("food-group", fetchFoodData);
  console.log(groupedFood, "groupedFood");
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Image
          src={hero2}
          alt="banner picture"
          className="w-full object-cover"
          height={400}
        />
      </div>
      <div className="flex flex-col items-center justify-center bg-zinc-800 w-full">
        <div className="w-full max-w-7xl mx-auto lg:w-[1264px]">
          <div className="flex flex-col items-center">
            <div className="w-full">
              <CarouselBadges />
            </div>
          </div>
          <div className="mt-14">
            <FoodContainer />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

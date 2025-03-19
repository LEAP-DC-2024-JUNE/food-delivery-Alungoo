import React from "react";
import hero2 from "../Images/hero2.png";
import Image from "next/image";
import Carousel1 from "@/components/Carousel1";
import FoodCard from "@/components/FoodCard";

export type FoodType = {
  type: string;
};

export type Appetizers = {
  title: string;
  price: number;
  description: string;
};

const FoodContainer = () => {
  const FoodCategories: FoodType[] = [
    { type: "Appetizer" },
    { type: "Salad" },
    { type: "Pizzas" },
    { type: "Lunch favorites" },
    { type: "Main dishes" },
    { type: "Fish & Sea foods" },
    { type: "Sea dish" },
    { type: "Side dish" },
    { type: "Brunch" },
    { type: "Desserts" },
  ];

  const cardDatas: Appetizers[] = [
    {
      title: "Finger Food",
      price: 12.99,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
    },
    {
      title: "Cranberry Brie Bites",
      price: 12.99,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
    },
    {
      title: "Sunshine Stackers",
      price: 12.33,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
    },
    {
      title: "Brie Crostini Appetizer",
      price: 12.33,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
    },
    {
      title: "Sunshine Stackers",
      price: 12.33,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
    },
    {
      title: "Sunshine Stackers",
      price: 12.33,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
    },
  ];

  return (
    <div>
      <Image src={hero2} alt="banner picture" />
      <div className="my-[100px] px-[220px]">
        <p className="my-[50px] text-white text-[30px]">Categories</p>
        <Carousel1 FoodCategories={FoodCategories} />
      </div>
      <div className="px-[200px] my-[50px]">
        <p className="my-[50px] text-white text-[30px]">Appetizers</p>
        <div className="grid grid-cols-3 gap-3">
          {cardDatas.map((data, index) => (
            <FoodCard data={data} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodContainer;

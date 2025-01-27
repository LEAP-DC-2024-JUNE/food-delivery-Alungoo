import React from "react";
import hero2 from "../Images/hero2.png";
import Image from "next/image";
import { BadgeOutline } from "@/components/BadgeOutline";
import { FoodCard } from "@/components/FoodCard";
export type FoodType = {
  type: string;
};
export type Appetizers = {
  title: string;
  price: number;
  description: string;
};

const Home = () => {
  const FoodCategories: FoodType[] = [
    {
      type: "Appetizer",
    },
    {
      type: "Salad",
    },
    {
      type: "Pizzas",
    },
    {
      type: "Lunch favorites",
    },
    {
      type: "Main dishes",
    },
    {
      type: "Fish & Sea foods",
    },
    {
      type: "Sea dish",
    },
    {
      type: "Side dish",
    },
    {
      type: "Brunch",
    },
    {
      type: "Desserts",
    },
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
      title: "Sunshine Stackers ",
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
      title: "Sunshine Stackers ",
      price: 12.33,
      description:
        "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
    },
  ];
  return (
    <div className="">
      <Image src={hero2} alt="banner picture" />
      <div className=" flex gap-3">
        {FoodCategories.map((category, index) => {
          return <BadgeOutline category={category} key={index} />;
        })}
      </div>
      <div>
        <p>Appetizers</p>
        <div className=" flex grid-cols-3 grid-rows-2">
          {cardDatas.map((data, index) => {
            return <FoodCard data={data} key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;

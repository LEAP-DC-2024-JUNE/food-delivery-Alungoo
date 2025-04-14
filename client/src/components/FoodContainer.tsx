"use client";
import React from "react";
import useSWR from "swr";
import { fetchFoodData } from "@/utils/fetchFoodData";
import FoodCard from "./FoodCard";
import { FoodCategoryType, FoodType } from "@/utils/types";

const FoodContainer = () => {
  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useSWR("food-category", fetchFoodData);

  const {
    data: foods,
    error: foodsError,
    isLoading: foodsLoading,
  } = useSWR("foods", fetchFoodData);

  if (categoriesLoading || foodsLoading) return <div>Loading ...</div>;
  if (categoriesError || foodsError) return <div>Failed to load</div>;

  const groupedFoods = categories
    .slice(0, 3)
    .map((category: FoodCategoryType) => {
      const foodByCategory: FoodType[] = [];

      for (let i = 0; i < foods.length; i++) {
        if (foods[i].category === category._id) {
          foodByCategory.push(foods[i]);
        }
      }

      return {
        categoryId: category._id,
        categoryName: category.categoryName,
        foods: foodByCategory,
      };
    });

  console.log(groupedFoods, "<<food");
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      {groupedFoods.map((categoryGroup: any) => (
        <div key={categoryGroup.categoryId} className="w-full space-y-4">
          <h2 className="text-white text-[30px]">
            {categoryGroup.categoryName}
          </h2>

          <div className="grid grid-cols-3 gap-9 w-full">
            {categoryGroup.foods.map((food: FoodType) => (
              <FoodCard key={food._id} data={food} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodContainer;

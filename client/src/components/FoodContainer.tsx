"use client";
import React, { useEffect } from "react";
import useSWR from "swr";
import { fetchFoodData } from "@/utils/fetchFoodData";
import FoodCard from "./FoodCard";
import { FoodCategoryType, FoodType } from "@/utils/types";

const FoodContainer = ({ selectedBadge }: any) => {
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
  if (!categories || !foods) return <div>No data available</div>;

  let categoriesToDisplay;

  if (selectedBadge && selectedBadge !== "") {
    const selectedCategory = categories.find(
      (category: any) => category.categoryName === selectedBadge
    );

    const otherCategories = categories.filter(
      (category: any) => category.categoryName !== selectedBadge
    );

    if (selectedCategory) {
      categoriesToDisplay = [selectedCategory, ...otherCategories];
    } else {
      categoriesToDisplay = categories;
    }
  } else {
    categoriesToDisplay = categories;
  }

  const limitedCategories = categoriesToDisplay.slice(0, 3);

  const groupedFoods = limitedCategories.map((category: FoodCategoryType) => {
    const foodByCategory = foods.filter(
      (food: FoodType) => food.category === category._id
    );

    return {
      categoryId: category._id,
      categoryName: category.categoryName,
      foods: foodByCategory,
    };
  });

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      {groupedFoods.map((categoryGroup: any, index: number) => (
        <div key={categoryGroup.categoryId} className="w-full space-y-2 mb-4">
          <h2 className="text-white text-[30px] mb-6">
            {categoryGroup.categoryName}
            {selectedBadge &&
              index === 0 &&
              selectedBadge === categoryGroup.categoryName}
          </h2>

          <div className="grid grid-cols-3 gap-9 w-full">
            {categoryGroup.foods.length > 0 ? (
              categoryGroup.foods.map((food: FoodType) => (
                <FoodCard key={food._id} data={food} />
              ))
            ) : (
              <p className="text-white col-span-3">
                No food items found in this category.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodContainer;

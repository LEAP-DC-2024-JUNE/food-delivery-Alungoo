"use client";
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";
import { fetchFoodData } from "@/utils/fetchFoodData";
import { FoodCategoryType } from "@/utils/types";

export function Badges() {
  const {
    data: badges,
    error,
    isLoading,
  } = useSWR("food-category", fetchFoodData);
  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Failed to load </div>;
  return (
    <div>
      {badges.map((badge: FoodCategoryType) => (
        <Badge
          variant="outline"
          className="inline-flex bg-white text-black items-center justify-center px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-colors cursor-pointer"
        >
          {badge.categoryName}
        </Badge>
      ))}
    </div>
  );
}

import * as React from "react";
import FoodInfoCard from "./FoodInfoCard";

export function FoodInfo({ foodItems }: any) {
  return (
    <div className="space-y-2">
      {foodItems.map((item: any, idx: number) => (
        <FoodInfoCard key={idx} foodItem={item} />
      ))}
    </div>
  );
}

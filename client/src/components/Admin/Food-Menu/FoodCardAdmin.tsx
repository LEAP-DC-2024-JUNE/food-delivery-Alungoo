import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FoodType } from "@/utils/types";
import { EditFoodDialog } from "./EditFoodDialog";

type cardPropsType = {
  data: FoodType;
  onUpdateFood?: (updatedFood: FoodType) => void;
};

const FoodCardAdmin = ({ data, onUpdateFood }: cardPropsType) => {
  const [foodData, setFoodData] = useState<FoodType>(data);

  const updateFoodInParent = (updatedFood: FoodType) => {
    setFoodData(updatedFood);

    if (onUpdateFood) {
      onUpdateFood(updatedFood);
    }
  };

  return (
    <Card className="w-[270.75px] bg-white rounded-[20px] p-[16px] flex flex-col gap-3 shadow-none">
      <CardHeader className="w-full flex justify-center p-0">
        <div className="relative">
          {foodData?.image ? (
            <>
              <img
                src={foodData.image}
                alt={foodData.foodName}
                style={{ width: "238.75px", height: "129px" }}
                className="rounded-xl object-cover"
              />
              <span className="absolute right-5 bottom-5 bg-white p-3 rounded-full cursor-pointer hover:bg-slate-100">
                <EditFoodDialog
                  selectedFood={foodData}
                  updateFoodInParent={updateFoodInParent}
                />
              </span>
            </>
          ) : (
            <p>No image available</p>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex justify-between items-center">
          <h1 className="text-[#EF4444] text-[14px] font-medium pb-2">
            {foodData.foodName}
          </h1>
          <p className="text-[12px]">${foodData.price}</p>
        </div>
        <p className="text-[12px] font-normal">{foodData.ingredients}</p>
      </CardContent>
    </Card>
  );
};

export default FoodCardAdmin;

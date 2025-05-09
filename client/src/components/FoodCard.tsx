import * as React from "react";
import Image from "next/image";
import Food1 from "../Images/food1.png";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FoodType } from "@/utils/types";
import { FoodDetail } from "./FoodDetail";

type cardPropsType = {
  data: FoodType;
};

const FoodCard = ({ data }: cardPropsType) => {
  return (
    <Card className="w-[365px] bg-white rounded-[20px] p-[16px] flex flex-col gap-3">
      <CardHeader className="w-full flex justify-center p-0">
        <div className="relative">
          {data?.image ? (
            <>
              <img
                src={data?.image}
                alt={data?.foodName}
                style={{ width: "365px", height: "210px" }}
                className="rounded-lg object-cover"
              />

              <FoodDetail
                id={data._id}
                foodImage={data.image}
                foodName={data.foodName}
                foodIngredients={data.ingredients}
                foodPrice={data.price}
              />
            </>
          ) : (
            <p>No image available</p>
          )}
        </div>
      </CardHeader>
      <CardContent className=" p-0">
        <div className="flex justify-between items-center">
          <h1 className="text-[#EF4444] text-2xl font-semibold">
            {data.foodName}
          </h1>
          <p className=" font-medium">${data.price}</p>
        </div>
        <p className="text-sm font-normal">{data.ingredients}</p>
      </CardContent>
    </Card>
  );
};
export default FoodCard;

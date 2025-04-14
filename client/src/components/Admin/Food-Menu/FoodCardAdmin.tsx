import * as React from "react";
import Image from "next/image";
import { Pen } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FoodType } from "@/utils/types";

type cardPropsType = {
  data: FoodType;
};

const FoodCardAdmin = ({ data }: cardPropsType) => {
  return (
    <Card className="w-[270.75px] bg-white rounded-[20px] p-[16px] flex flex-col gap-3 shadow-none">
      <CardHeader className="w-full flex justify-center p-0">
        <div className="relative">
          {data?.image ? (
            <>
              <img
                src={data?.image}
                alt={data?.foodName}
                style={{ width: "238.75px", height: "129px" }}
                className="rounded-xl object-cover"
              />
              <span className=" absolute right-5 bottom-5 bg-white p-3 rounded-full">
                {" "}
                <Pen color="red" size={18} />
              </span>
            </>
          ) : (
            <p>No image available</p>
          )}
        </div>
      </CardHeader>
      <CardContent className=" p-0">
        <div className="flex justify-between items-center">
          <h1 className="text-[#EF4444] text-[14px] font-medium pb-2">
            {data.foodName}
          </h1>
          <p className=" text-[12px]">${data.price}</p>
        </div>
        <p className="text-[12px] font-normal">{data.ingredients}</p>
      </CardContent>
    </Card>
  );
};
export default FoodCardAdmin;

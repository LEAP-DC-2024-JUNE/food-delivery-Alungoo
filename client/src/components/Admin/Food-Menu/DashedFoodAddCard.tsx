import * as React from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AddButtonFoodMenu from "@/svg/AddButtonFoodMenu";

export function DashedFoodAddCard({ foodData }: any) {
  return (
    <Card className="w-[270px] h-[239px] border border-dashed border-red-500 relative">
      <CardContent className="w-full h-full flex flex-col items-center justify-center p-0">
        <div className="flex flex-col items-center space-y-1">
          <AddButtonFoodMenu />
          <span className="text-sm text-center font-medium ">
            Add new Dish to <br />
            {foodData._id.categoryName}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

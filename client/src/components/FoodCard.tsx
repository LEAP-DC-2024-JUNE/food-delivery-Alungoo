import * as React from "react";
import Image from "next/image";
import Food1 from "../Images/food1.png";
import { Appetizers } from "@/app/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type cardPropsType = {
  data: Appetizers;
};

export function FoodCard({ data }: cardPropsType) {
  return (
    <Card className="w-[400px] bg-white rounded-[20px]">
      <CardHeader>
        <Image src={Food1} width={370} alt=" food picture"></Image>
      </CardHeader>
      <CardContent className="flex  justify-between px-5 py-3">
        <h1 className="text-[#EF4444] text-2xl font-semibold">{data.title}</h1>
        <strong>{data.price}</strong>
      </CardContent>
      <CardFooter>
        <p className="text-sm font-normal">{data.description}</p>
      </CardFooter>
    </Card>
  );
}

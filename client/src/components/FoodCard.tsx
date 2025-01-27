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
    <Card className=" object-contain">
      <CardHeader>
        <Image src={Food1} width={365} alt=" food picture"></Image>
      </CardHeader>
      <CardContent className="flex justify-between">
        <h1 className=" text-red-600 font-semibold text-[24px]">
          {data.title}
        </h1>
        <strong>{data.price}</strong>
      </CardContent>
      <CardFooter>
        <p>{data.description}</p>
      </CardFooter>
    </Card>
  );
}

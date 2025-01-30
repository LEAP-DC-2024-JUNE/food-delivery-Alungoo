import * as React from "react";
import Image from "next/image";
import { FormData } from "@/app/inClass/page";
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
  data: FormData;
};

export function InClassCard({ data }: cardPropsType) {
  return (
    <Card className="w-[400px] bg-white rounded-[20px]">
      <CardHeader></CardHeader>
      <CardContent className=" px-5 py-3">
        <h1 className="text-[#EF4444] text-2xl font-semibold">
          {data.username}
        </h1>
        <strong>{data.age}</strong>
      </CardContent>
      <CardFooter>
        <p className=" font-normal">{data.phoneNumber}</p>
      </CardFooter>
    </Card>
  );
}

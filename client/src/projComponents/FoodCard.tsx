import * as React from "react"
import Image from "next/image"
import Food1 from "../Images/food1.png"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FoodType } from "@/app/page"



type cardPropsType = {
 food: FoodType
}
export function FoodCard({food}:cardPropsType) {
  return (
  
    <Card className=" object-contain">
      <CardHeader>
      <Image src={Food1} width={365} alt=" food picture"></Image>
      </CardHeader>
      <CardContent className="flex justify-between">
      <h1 className=" text-red-600 font-semibold text-[24px]">{food.title}</h1>
      <strong>{food.price}</strong>
      </CardContent>
      <CardFooter>
      <p>{food.description}</p>
      </CardFooter>
    </Card>
    
  )
}

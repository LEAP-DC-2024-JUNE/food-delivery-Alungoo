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



export function FoodCard() {
  return (
    <Card className=" object-contain">
      <CardHeader>
      <Image src={Food1} width={365} alt=" food picture"></Image>
      </CardHeader>
      <CardContent className="flex justify-between">
      <h1 className=" text-red-600 font-semibold text-[24px]">Finger Food</h1>
      <strong>$12.99</strong>
      </CardContent>
      <CardFooter className="">
      <p>Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.</p>
      </CardFooter>
    </Card>
  )
}

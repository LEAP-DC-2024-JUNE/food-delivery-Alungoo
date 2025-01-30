import * as React from "react";
import Image from "next/image";
import { FormData } from "@/app/nameInput/page";
import { Appetizers } from "@/app/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { EditUser } from "./EditUser";

type cardPropsType = {
  data: FormData;
};

export function UserCard({ data }: cardPropsType) {
  return (
    <Card className="w-[400px] rounded-[20px]">
      <CardHeader>{data.username}</CardHeader>
     
      <CardContent className=" flex flex-col justify-center">
      
        <strong>{data.age}</strong>
        <strong className="">{data.phoneNumber}</strong>
      </CardContent>
      <CardFooter>
        <div className=" flex gap-5">

      <EditUser data={data}/>
        <Button variant="outline">Delete Profile</Button>
       
        </div>
      </CardFooter>
    </Card>
  );
}

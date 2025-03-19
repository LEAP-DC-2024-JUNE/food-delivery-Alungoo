import * as React from "react";
import { FormData } from "@/app/nameInput/page";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { EditUser } from "./EditUser";

type cardPropsType = {
  data: FormData;
};

export function UserCard({ data }: cardPropsType) {
  return (
    <Card className="w-[300px] rounded-[20px]">
      <CardHeader>
        <strong>{data.name}</strong>
      </CardHeader>
      <CardContent className=" flex flex-col justify-center gap-4">
        <p>Age: {data.age}</p>
        <p className="">Phone Number: {data.phoneNumber}</p>
      </CardContent>
      <CardFooter>
        <div className=" flex gap-5">
          <EditUser data={data} />
          <Button variant="outline">Delete Profile</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

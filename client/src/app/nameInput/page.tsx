"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserCard } from "@/components/UserCard";

export type FormData = {
  name: string;
  age: string;
  phoneNumber: string;
  _id: string;
};

export default function NameInput() {
  const initialData: FormData = {
    name: "",
    age: "",
    phoneNumber: "",
    _id: "",
  };

  const [formData, setFormData] = useState<FormData>(initialData);
  const [allData, setAllData] = useState<FormData[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:4000/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      setFormData(initialData);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDatas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/get-all-users");
      const data = await res.json();
      console.log(data);
      setAllData(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);

  return (
    <div className="space-y-6 px-[50px] mt-7">
      <Card className="w-[400px] bg-white rounded-[20px]">
        <CardHeader>
          <CardTitle>Add Contact Information</CardTitle>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              name="name"
            />
            <Input
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              name="age"
            />
            <Input
              type="number"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" onClick={handleSubmit}>
              Add
            </Button>
          </CardFooter>
        </form>
      </Card>
      <div className=" underline">Users:</div>
      <div className=" flex gap-5 flex-wrap my-10 ">
        {allData?.map((data, index) => (
          <UserCard data={data} key={index} />
        ))}
      </div>
    </div>
  );
}

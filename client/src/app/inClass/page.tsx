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
import { InClassCard } from "@/components/InClassCard";

export type FormData = {
  username: string;
  age: string;
  phoneNumber: string;
};

export default function InClass() {
  const initialData: FormData = {
    username: "",
    age: "",
    phoneNumber: "",
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
    await fetch("http://127.0.0.1:3000/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    setFormData(initialData);
  };

  const fetchDatas = async () => {
    try {
      const res = await fetch("http://127.0.0.1:3000/get-all-users");
      const data = await res.json();
      console.log(data);
      setAllData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDatas();
  }, []);
  return (
    <div className="space-y-6">
      <Card className="w-[400px] bg-white rounded-[20px]">
        <CardHeader>
          <CardTitle>Add Contact Information</CardTitle>
        </CardHeader>
        <form>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              name="username"
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

      <div className="">
        {allData.map((data, index) => (
          <Card key={index} className="bg-white">
            <CardContent>
              <InClassCard data={data} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

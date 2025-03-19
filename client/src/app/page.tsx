"use client";
import { useState, useEffect } from "react";
export type FoodType = {
  type: string;
};
export type Appetizers = {
  title: string;
  price: number;
  description: string;
};

export default function Home() {
  const [helloMessage, setHelloMessage] = useState("");
  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://food-delivery-alungoo.onrender.com"
      );
      console.log("Response Status:", response.status);
      console.log("Content-Type:", response.headers.get("content-type"));

      // Ensure it's JSON before parsing
      if (!response.headers.get("content-type")?.includes("application/json")) {
        throw new Error("Received non-JSON response from server");
      }
      const hello = await response.json();
      setHelloMessage(hello.message);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return <div>{helloMessage}</div>;
}

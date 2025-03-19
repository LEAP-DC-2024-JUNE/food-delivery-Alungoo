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
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("https://food-delivery-alungoo.onrender.com")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error fetching data"));
  }, []);

  return <div>{message}</div>;
}

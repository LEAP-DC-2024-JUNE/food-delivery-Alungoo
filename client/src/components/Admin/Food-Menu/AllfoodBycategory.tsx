"use client";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { fetchFoodData } from "@/utils/fetchFoodData";
import useSWR from "swr";
import { useState, useEffect } from "react";
import AddFoodDialog from "./AddFoodDialog";
import FoodCardAdmin from "./FoodCardAdmin";

const FoodByCategory = () => {
  const [foodInput, setFoodInput] = useState<{
    foodName: string;
    price: string;
    image: File | null;
    ingredients: string;
    category: string;
  }>({
    foodName: "",
    price: "",
    image: null,
    ingredients: "",
    category: "",
  });

  const [fixedFoodDatas, setFixedFoodDatas] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const {
    data: foodDatas,
    error,
    isLoading,
  } = useSWR("food-group", fetchFoodData);

  useEffect(() => {
    if (foodDatas) {
      const slicedCategories = foodDatas.slice(0, 5);
      setFixedFoodDatas(slicedCategories);
    }
  }, [foodDatas]);

  const handleInputChange = (e: any) => {
    setFoodInput({ ...foodInput, [e.target.name]: e.target.value });
  };

  const createFood = async () => {
    try {
      const imageUrl = await uploadImageToCloudinary(foodInput.image as File);
      await fetch("http://127.0.0.1:4000/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...foodInput, image: imageUrl }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;

  return (
    <div className="rounded-lg bg-[#F4F4F5]">
      {fixedFoodDatas?.map((foodData: any, index: number) => (
        <div key={index} className="bg-[#F4F4F5] pb-4 rounded-md">
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-[20px] font-bold mb-4">
              {foodData._id.categoryName} ({foodData.foods.length})
            </h2>
            <div className="flex flex-wrap gap-4">
              <AddFoodDialog
                foodData={foodData}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                foodInput={foodInput}
                setFoodInput={setFoodInput}
                createFood={createFood}
                handleInputChange={handleInputChange}
              />

              {foodData?.foods?.map((food: any) => (
                <FoodCardAdmin key={food._id} data={food} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodByCategory;

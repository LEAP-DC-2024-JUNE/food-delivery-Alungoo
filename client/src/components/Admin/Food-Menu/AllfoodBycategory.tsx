"use client";
import { uploadImageToCloudinary } from "@/utils/uploadImageToCloudinary";
import { useState, useEffect } from "react";
import AddFoodDialog from "./AddFoodDialog";
import FoodCardAdmin from "./FoodCardAdmin";
interface FoodByCategoryProps {
  categories: any[];
  groupedFood: () => void;
  selectedCategoryProp: string | null;
}
const FoodByCategory: React.FC<FoodByCategoryProps> = ({
  categories,
  groupedFood,
  selectedCategoryProp,
}) => {
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

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleInputChange = (e: any) => {
    setFoodInput({ ...foodInput, [e.target.name]: e.target.value });
  };
  const reorderedCategories = selectedCategoryProp
    ? [
        ...categories.filter(
          (category) => category.categoryName === selectedCategoryProp
        ),
        ...categories.filter(
          (category) => category.categoryName !== selectedCategoryProp
        ),
      ]
    : categories;

  const createFood = async () => {
    const token = localStorage.getItem("token");
    try {
      const imageUrl = await uploadImageToCloudinary(foodInput.image as File);
      await fetch("http://127.0.0.1:4000/foods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...foodInput, image: imageUrl }),
      });
      await groupedFood();
      // setIsDialogOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(categories, "categoriessss all");
  return (
    <div className="rounded-lg bg-[#F4F4F5]">
      {reorderedCategories?.map((foodData: any, index: number) => (
        <div key={index} className="bg-[#F4F4F5] pb-4 rounded-md">
          <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-[20px] font-bold mb-4">
              {foodData?.categoryName} ({foodData.foods.length})
            </h2>
            <div className="flex flex-wrap gap-4">
              <AddFoodDialog
                // open={isDialogOpen}
                // setOpen={setIsDialogOpen}
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

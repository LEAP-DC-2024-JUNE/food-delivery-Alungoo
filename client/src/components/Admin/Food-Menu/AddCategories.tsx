"use client";
import React, { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { fetchFoodCategory } from "@/utils/fetchFoodData";
import { Badge } from "@/components/ui/badge";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FoodByCategory from "@/components/Admin/Food-Menu/AllfoodBycategory";
import { AvatarPic } from "../Common/Avatar";
import AddButtonFoodMenu from "@/svg/AddButtonFoodMenu";

export default function AddCategories() {
  const [groupedFood, setGroupedFood] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const fetchGroupedFood = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const res = await fetch("http://127.0.0.1:4000/food-group/admin", {
        method: "GET",
        headers: headers,
      });
      const data = await res.json();
      console.log(data, "<<data");
      setCategories(data);
      const foodCounts = data.map((group: any) => ({
        categoryName: group?.categoryName,
        count: group.foods.length,
      }));
      setGroupedFood(foodCounts);
      console.log(groupedFood, "<<groupedfoodbn");
    } catch (err) {
      console.error("Error fetching food groups:", err);
    }
  };

  const totalFoodCount = groupedFood.reduce(
    (total, item) => total + item.count,
    0
  );

  const addCategory = async () => {
    try {
      await fetch("http://127.0.0.1:4000/food-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ categoryName }),
      });
      setCategoryName("");
      setIsDialogOpen(false);
      fetchGroupedFood(); // Refresh food categories
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleAllDishesClick = () => {
    setSelectedCategory(null);
  };

  useEffect(() => {
    fetchGroupedFood();
  }, []);

  if (!categories.length) return <div>Loading...</div>;
  return (
    <div className="flex flex-col items-center absolute">
      <div className="flex justify-end max-w-[1171px] w-full my-2">
        <AvatarPic />
      </div>
      <div className="bg-white rounded-xl max-w-[1171px] p-6 shadow-md">
        <div>
          <p className="text-[20px] font-semibold mb-4">Dishes Category</p>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="flex flex-wrap gap-3 items-center mb-4">
              <Badge
                variant="outline"
                className={`px-4 py-2 rounded-full cursor-pointer ${
                  selectedCategory === null ? "bg-black text-white" : ""
                }`}
                onClick={handleAllDishesClick}
              >
                All Dishes
                <span
                  className={`ml-3 text-xs font-semibold rounded-full px-2 py-[0.7px] ${
                    selectedCategory === null
                      ? " border-red-600"
                      : "bg-black text-white"
                  }`}
                >
                  {totalFoodCount}
                </span>
              </Badge>

              {categories?.map((cat: any, idx: number) => {
                const countObj = groupedFood.find(
                  (item) => item.categoryName === cat.categoryName
                );

                return (
                  <Badge
                    key={idx}
                    variant="outline"
                    className={`px-4 py-2 rounded-full hover:border-red-400 cursor-pointer ${
                      selectedCategory === cat.categoryName
                        ? "bg-black text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => handleCategoryClick(cat.categoryName)}
                  >
                    {cat.categoryName}
                    {countObj && (
                      <span
                        className={`ml-3 text-xs font-semibold rounded-full px-2 py-[0.7px] ${
                          selectedCategory === cat.categoryName
                            ? "bg-white text-black"
                            : "bg-black text-white"
                        }`}
                      >
                        {countObj.count}
                      </span>
                    )}
                  </Badge>
                );
              })}

              <DialogTrigger asChild>
                <div className="w-[38px] h-[38px]">
                  <AddButtonFoodMenu />
                </div>
              </DialogTrigger>
            </div>

            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle>Add new category</DialogTitle>
              </DialogHeader>

              <div className="py-4">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="mt-2"
                />
              </div>

              <DialogFooter>
                <Button
                  onClick={addCategory}
                  className="bg-black text-white hover:text-black"
                >
                  Add Category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="w-full max-w-[1171px] mt-10 bg-white rounded-2xl">
        <FoodByCategory
          categories={categories}
          groupedFood={fetchGroupedFood}
          selectedCategoryProp={selectedCategory}
        />
      </div>
    </div>
  );
}

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
  const {
    data: categories,
    error,
    isLoading,
  } = useSWR("food-category", fetchFoodCategory);
  const [groupedFood, setGroupedFood] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchGroupedFood = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/food-group");
      const data = await res.json();

      const foodCounts = data.map((group: any) => ({
        categoryName: group._id.categoryName,
        count: group.foods.length,
      }));

      setGroupedFood(foodCounts);
    } catch (err) {
      console.error("Error fetching food groups:", err);
    }
  };

  const totalFoodCount = groupedFood.reduce(
    (total, item) => total + item.count,
    0
  );

  const addCategory = async () => {
    if (!categoryName.trim()) return;

    try {
      await fetch("http://127.0.0.1:4000/food-category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName }),
      });

      setCategoryName("");
      setIsDialogOpen(false);
      mutate("food-category"); // Refresh category list
      fetchGroupedFood(); // Refresh food counts
    } catch (err) {
      console.error("Error adding category:", err);
    }
  };

  useEffect(() => {
    fetchGroupedFood();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu</div>;

  return (
    <div className=" flex flex-col items-center absolute">
      {/* Main Box: Avatar + Dishes Category + Badges + Add Category Button */}
      <div className="flex justify-end  max-w-[1171px] w-full my-2">
        <AvatarPic />
      </div>
      <div className="bg-white rounded-xl ml- max-w-[1171px] p-6 shadow-md">
        <div className="">
          <p className="text-[20px] font-semibold mb-4">Dishes Category</p>

          {/* Dialog to Add Category */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <div className="flex flex-wrap gap-3 items-center mb-4">
              {/* All Dishes Badge */}
              <Badge variant="outline" className="px-4 py-2 rounded-full">
                All Dishes
                <span className="ml-3 text-xs font-semibold bg-black text-white rounded-full px-2 py-[0.7px]">
                  {totalFoodCount}
                </span>
              </Badge>

              {/* Category Badges */}
              {categories?.map((cat: any, idx: number) => {
                const countObj = groupedFood.find(
                  (item) => item.categoryName === cat.categoryName
                );

                return (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-white text-black px-4 py-2 rounded-full"
                  >
                    {cat.categoryName}
                    {countObj && (
                      <span className="ml-3 text-xs font-semibold bg-black text-white rounded-full px-2 py-[0.7px]">
                        {countObj.count}
                      </span>
                    )}
                  </Badge>
                );
              })}

              {/* Add Category Button */}
              <DialogTrigger asChild>
                <div className="w-[38px] h-[38px]">
                  <AddButtonFoodMenu />
                </div>
              </DialogTrigger>
            </div>

            {/* Dialog Content for Adding New Category */}
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

      {/* Separate FoodByCategory Section */}
      <div className="w-full max-w-[1171px] mt-10 bg-white rounded-2xl">
        <FoodByCategory />
      </div>
    </div>
  );
}

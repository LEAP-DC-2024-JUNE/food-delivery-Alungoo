"use client";
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
import { Button } from "@/components/ui/button";
import FileUpload from "../Common/FileUpload";
import { DashedFoodAddCard } from "./DashedFoodAddCard";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const AddFoodDialog = ({
  foodData,
  selectedCategory,
  setSelectedCategory,
  foodInput,
  setFoodInput,
  createFood,
  handleInputChange,
}: any) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          onClick={() => {
            console.log("Clicked Category:", foodData._id.categoryName);
            setSelectedCategory(foodData._id.categoryName);
            setFoodInput({
              ...foodInput,
              category: foodData._id,
            });
          }}
        >
          <DashedFoodAddCard foodData={foodData} />
        </div>
      </DialogTrigger>

      <DialogContent className="dark:bg-slate-800 bg-slate-50">
        <DialogHeader>
          <DialogTitle className=" mb-3">
            Add New Dish to {selectedCategory}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className=" flex justify-between">
            <div>
              <Label htmlFor="foodName">Food name</Label>
              <Input
                placeholder="Type food name"
                id="name"
                name="foodName"
                value={foodInput.foodName}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="foodPrice">Food price</Label>
              <Input
                placeholder="Enter price ..."
                id="price"
                type="number"
                name="price"
                value={foodInput.price}
                onChange={handleInputChange}
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              placeholder="List ingredients..."
              id="ingredients"
              name="ingredients"
              value={foodInput.ingredients}
              onChange={handleInputChange}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="file_input">Food Image</Label>
            <FileUpload setFoodInput={setFoodInput} />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={createFood}
            className="bg-black text-white hover:bg-gray-800"
          >
            Add Dish
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddFoodDialog;

"use client";
import * as React from "react";
import { BadgeOutline } from "./BadgeOutline";
import { FoodType } from "@/app/page";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Import icons if you're using lucide-react

interface CarouselProps {
  FoodCategories: FoodType[];
}

export function Carousel1({ FoodCategories }: CarouselProps) {
  return (
    <div className="relative w-full">
      <button
        className="absolute -left-10 top-1/2 -translate-y-1/2 hover:bg-gray-600 text-white rounded-full p-2 z-10"
        aria-label="Previous"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="flex flex-wrap gap-6 justify-center items-center px-8">
        {FoodCategories.map((category, index) => (
          <div
            key={`category-${index}`}
            className="transition-all duration-300"
          >
            <BadgeOutline category={category} />
          </div>
        ))}
      </div>

      <button
        className="absolute right-10 top-1/2 -translate-y-1/2 hover:bg-gray-600 text-white rounded-full p-2 z-10"
        aria-label="Next"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

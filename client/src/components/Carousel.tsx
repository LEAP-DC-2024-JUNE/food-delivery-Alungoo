"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";
import { fetchFoodData } from "@/utils/fetchFoodData";
import { FoodCategoryType } from "@/utils/types";

export function CarouselBadges() {
  const {
    data: badges,
    error,
    isLoading,
  } = useSWR("food-category", fetchFoodData);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <div className="relative w-full max-w-7xl mx-auto lg:w-[1264px]">
      <p className="text-[30px] font-normal my-6 text-white">Categories</p>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="flex gap-1">
          {badges.map((badge: FoodCategoryType) => (
            <CarouselItem
              key={badge._id}
              className="basis-auto flex-grow-0 flex-shrink-0"
            >
              <Badge
                variant="outline"
                className="inline-block bg-white text-black items-center justify-center px-8 py-1 border-none font-normal text-[18px] rounded-full text-sm hover:bg-[#EF4444] transition-colors cursor-pointer"
              >
                {badge.categoryName}
              </Badge>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute -left-7 text-white bg-transparent border-none shadow-none hover:bg-transparent hover:scale-110 transition-transform cursor-pointer" />
        <CarouselNext className="absolute -right-7 text-white bg-transparent border-none shadow-none hover:bg-transparent hover:scale-110 transition-transform hover:text-white" />
      </Carousel>
    </div>
  );
}

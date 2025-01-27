import { Badge } from "@/components/ui/badge";
import { FoodType } from "@/app/page";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type badgePropsType = {
  category: FoodType;
};
export function BadgeOutline({ category }: badgePropsType) {
  return (
    <Carousel
      orientation="horizontal"
      opts={{
        align: "start",
      }}
      className="w-full max-w-sm "
    >
      <CarouselContent>
        <CarouselItem className="md:basis-1/2 lg:basis-1/3">
          <div className="p-1">
            <Card>
              <CardContent className="flex  items-center justify-center p-6">
                <Badge variant="outline" className=" rounded-3xl">
                  {category.type}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <div className="flex bg-red-400">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}

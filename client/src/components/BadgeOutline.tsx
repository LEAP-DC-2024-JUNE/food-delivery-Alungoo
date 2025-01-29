import { Badge } from "@/components/ui/badge";
import { FoodType } from "@/app/page";

type badgePropsType = {
  category: FoodType;
};
export function BadgeOutline({ category }: badgePropsType) {
  return (
    <Badge variant="outline" className=" rounded-3xl">
      {category.type}
    </Badge>
  );
}

import { Badge } from "@/components/ui/badge";
import { FoodType } from "@/app/page";

type badgePropsType = {
  category: FoodType;
};
export function BadgeOutline({ category }: badgePropsType) {
  return (
    <Badge
      variant="outline"
      className="inline-flex bg-white text-black items-center justify-center px-4 py-2 rounded-full text-sm hover:bg-red-600 transition-colors cursor-pointer"
    >
      {category.type}
    </Badge>
  );
}

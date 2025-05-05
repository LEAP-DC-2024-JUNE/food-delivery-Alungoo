import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pen } from "lucide-react";
import FileUpload from "../Common/FileUpload";
import { useEffect, useState, useRef } from "react";
import { renderUrl } from "@/utils/render";

interface FoodItem {
  _id: string;
  foodName: string;
  category: string;
  ingredients: string;
  price: number;
  image: string;
  [key: string]: any;
}

interface EditFoodDialogProps {
  selectedFood: FoodItem;
  updateFoodInParent: (updatedFood: FoodItem) => void;
}

export function EditFoodDialog({
  selectedFood,
  updateFoodInParent,
}: EditFoodDialogProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string>(selectedFood.category);
  const [editFoodData, setEditFoodData] = useState({
    foodName: selectedFood.foodName,
    category: selectedFood.category,
    ingredients: selectedFood.ingredients,
    price: selectedFood.price,
    image: selectedFood.image,
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${renderUrl}/food-category`);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    setEditFoodData({
      foodName: selectedFood.foodName,
      category: selectedFood.category,
      ingredients: selectedFood.ingredients,
      price: selectedFood.price,
      image: selectedFood.image,
    });
    setCategoryId(selectedFood.category);
  }, [selectedFood]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFoodData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    if (imageUrl) {
      setEditFoodData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const updatedFood = { ...selectedFood, ...editFoodData };

      updateFoodInParent(updatedFood);

      const res = await fetch(`${renderUrl}/foods/${selectedFood._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFoodData),
      });

      if (!res.ok) {
        throw new Error("Failed to update food item");
      }

      const updatedDataFromServer = await res.json();

      toast.success("The dish has been updated successfully");

      setOpen(false);
    } catch (err) {
      console.error("Error updating food:", err);
      toast.error("Failed to update the dish. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">
          <Pen color="red" size={18} />
        </div>
      </DialogTrigger>
      <DialogContent className="w-[472px]">
        <DialogHeader>
          <DialogTitle>Dishes info</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <Label htmlFor="name" className="text-[#71717A] text-[12px]">
              Dish name
            </Label>
            <Input
              id="foodName"
              name="foodName"
              type="text"
              value={editFoodData.foodName}
              onChange={handleChange}
              className="w-[288px]"
            />
          </div>

          <div className="flex items-start justify-between">
            <Label className="text-[#71717A] text-[12px]">Dish category</Label>
            <div className="w-[288px]">
              <Select
                value={categoryId}
                onValueChange={(value) => {
                  setCategoryId(value);
                  setEditFoodData((prev) => ({ ...prev, category: value }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category: any) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.categoryName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <Label htmlFor="ingredients" className="text-[#71717A] text-[12px]">
              Ingredients
            </Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              value={editFoodData.ingredients}
              onChange={handleChange}
              className="w-[288px]"
            />
          </div>

          <div className="flex items-start justify-between">
            <Label htmlFor="price" className="text-[#71717A] text-[12px]">
              Price
            </Label>
            <Input
              id="price"
              name="price"
              value={editFoodData.price}
              onChange={handleChange}
              type="number"
              className="w-[288px]"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <Label
              htmlFor="file_input"
              className="text-[#71717A] text-[12px] w-[100px]"
            >
              Image
            </Label>
            <div className="flex flex-col gap-2 w-[288px]">
              {editFoodData.image ? (
                <div className="relative h-24 w-full rounded-md overflow-hidden">
                  <img
                    src={editFoodData.image}
                    alt="Current dish"
                    className="h-full w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEditFoodData((prev) => ({ ...prev, image: "" }))
                    }
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="h-24 w-full">
                  <FileUpload
                    className="w-full h-full"
                    onUploadComplete={handleImageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export interface FoodCategoryType {
  categoryName: string;
  _id: string;
}
export interface FoodType {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
}
export interface GroupedCategoryType {
  categoryId: number;
  categoryName: string;
  foods: string;
  id: number;
}

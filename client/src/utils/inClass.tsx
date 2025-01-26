
import { FoodCard } from "@/projComponents/FoodCard"


export type FoodType = {
  title: string,
  price: number,
  description:string,

}

export default function Home() {
  const cardData: FoodType [] = [
    {
      title: "Hello",
      price: 12.99,
      description: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
     
    },
    {
      title: "Hello",
      price: 12.33,
      description: "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar",
    }
  ];

  return (
  <div className=" my-10 px-10">
    {cardData.map((food) => {
      return <FoodCard food={food}/>
    })}

  
    </div>
  ) 
}


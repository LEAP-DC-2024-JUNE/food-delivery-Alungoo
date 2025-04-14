import axios from "axios";

export const fetchFoodData = async (url: any) => {
  try {
    const res = await axios.get(`http://localhost:4000/${url}`);

    const food = res.data;
    console.log(food);
    return food;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};
export const fetchFoodCategory = async (url: any) => {
  try {
    const res = await axios.get(`http://localhost:4000/${url}`);

    const food = res.data;
    console.log(food);
    return food;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};

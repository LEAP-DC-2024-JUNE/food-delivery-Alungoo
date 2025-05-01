import axios from "axios";
import { renderUrl } from "./render";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const fetchFoodData = async (url: any) => {
  try {
    const res = await axios.get(`${renderUrl}/${url}`);

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
    const res = await axios.get(`${renderUrl}/${url}`);

    const food = res.data;
    console.log(food);
    return food;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};

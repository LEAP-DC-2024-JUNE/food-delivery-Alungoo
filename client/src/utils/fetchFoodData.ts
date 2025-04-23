import axios from "axios";

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
    const res = await axios.get(`http://localhost:4000/${url}`, getAuthHeaders());

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
    const res = await axios.get(`http://localhost:4000/${url}`, getAuthHeaders());

    const food = res.data;
    console.log(food);
    return food;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw error;
  }
};

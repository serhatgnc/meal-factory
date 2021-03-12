import axios from "axios";
import {AllMealCategories, MealByName, RandomMeal} from "global";

export const getRandomMeal = async () => {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const { meals = []} = await response.data
    return meals as RandomMeal[];
  };

export const getMealByName = async (searchTerm:string) => {
  const response = await axios.get(`https:www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
  const { meals = []} = await response.data
  return meals as MealByName[];
};

export const getAllMealCategories = async() => {
  const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php")
  const {categories = []} = response.data
  return categories as AllMealCategories[]
}
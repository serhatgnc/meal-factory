export type RandomMeal = {
  strMeal: string;
  strArea: string;
  strInstructions: string;
  strCategory: string;
  strMealThumb: string;
  [key: string]: string;
};

export type MealByName = RandomMeal;

export type SelectedMeal = RandomMeal;

export type AllMealCategories = {
  strCategory: string;
  strCategoryDescription: string;
  strCategoryThumb: string;
};

export type selectedMealCategory={
  strMeal:string;
  strMealThumb:string;
  idMeal:string;
};

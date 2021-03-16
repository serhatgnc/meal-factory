import { AllMealCategories, selectedMealCategory } from "global";
import { useEffect, useState } from "react";
import { getCategoryMeals } from "src/utils/fetchData";

type AllMealCategoryProps = {
  index: number;
  mealCategory: AllMealCategories;
  setAllMealCategories: React.Dispatch<
    React.SetStateAction<AllMealCategories[]>
  >;
  setSelectedCategoryMeals: React.Dispatch<
    React.SetStateAction<selectedMealCategory[] | undefined>
  >;
};

const AllMealCategory = ({
  index,
  mealCategory,
  setAllMealCategories,
  setSelectedCategoryMeals,
}: AllMealCategoryProps) => {

  const getSelectedCategory = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAllMealCategories([]);
    const categoryName = e.currentTarget.getAttribute("data-category");
    if (categoryName) {
      const categoryMeals = await getCategoryMeals(categoryName);
      setSelectedCategoryMeals(categoryMeals);
    }
  };

  return (
    <button
      className="mealCategoryButton"
      key={index}
      data-category={mealCategory.strCategory}
      onClick={(e) => getSelectedCategory(e)}
    >
      <div className="mealCategory">
        <h1 style={{ color: "#550527" }}>{mealCategory.strCategory}</h1>
        <img src={mealCategory.strCategoryThumb} alt="" />
      </div>
    </button>
  );
};

export default AllMealCategory;

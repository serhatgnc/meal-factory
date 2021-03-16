import { motion as m } from "framer-motion";
import { AllMealCategories, RandomMeal, selectedMealCategory } from "global";
import { getSelectedMeal } from "src/utils/fetchData";

type SelectedCategoryMealProps = {
  index: number;
  meal: selectedMealCategory;
  setSelectedMeal: React.Dispatch<
    React.SetStateAction<RandomMeal[] | undefined>
  >;
  idMeal: string;
  setSearchMeal: React.Dispatch<React.SetStateAction<RandomMeal[] | undefined>>;
  setSelectedCategoryMeals: React.Dispatch<
    React.SetStateAction<selectedMealCategory[] | undefined>
  >;
  setAllMealCategories: React.Dispatch<
    React.SetStateAction<AllMealCategories[]>
  >;
};

const SelectedCategoryMeal = ({
  index,
  meal,
  setSelectedMeal,
  idMeal,
  setSearchMeal,
  setSelectedCategoryMeals,
  setAllMealCategories,
}: SelectedCategoryMealProps) => {
  const getSelectedMealById = async () => {
    setSearchMeal([]);
    setSelectedCategoryMeals([]);
    setAllMealCategories([]);
    console.log(idMeal);
    setSelectedMeal(await getSelectedMeal(idMeal));
  };

  return (
    <m.div
      className="selected-category-meal"
      whileHover={{
        position: "relative",
        zIndex: 1,
        scale: 1.1,
        transition: {
          duration: 0.2,
        },
      }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "#241909",
          marginTop: "0.3em",
        }}
      >
        {meal.strMeal}
      </h3>
      <button
        style={{
          background: `url(${meal.strMealThumb}) no-repeat center`,
          backgroundSize: "275px",
        }}
        className="selected-category-meal-button"
        key={index}
        onClick={() => getSelectedMealById()}
      ></button>
    </m.div>
  );
};

export default SelectedCategoryMeal;

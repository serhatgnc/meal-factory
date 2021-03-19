import { motion as m } from "framer-motion";
import { RandomMeal, selectedMealCategory } from "global";
import { pageTransition } from "src/utils/constants";
import { getSelectedMeal } from "src/utils/fetchData";

type SelectedCategoryMealProps = {
  meal: selectedMealCategory;
  setSelectedMeal: React.Dispatch<
    React.SetStateAction<RandomMeal[] | undefined>
  >;
  idMeal: string;
  setSelectedCategoryMeals: React.Dispatch<
    React.SetStateAction<selectedMealCategory[] | undefined>
  >;
};

const SelectedCategoryMeal = ({
  meal,
  setSelectedMeal,
  idMeal,
  setSelectedCategoryMeals,
}: SelectedCategoryMealProps) => {
  const getSelectedMealById = async () => {
    setSelectedCategoryMeals([]);
    setSelectedMeal(await getSelectedMeal(idMeal));
  };

  return (
    <m.div
      className="selected-category-meal"
      whileHover={{
        position: "relative",
        zIndex: 1,
        scale: 1.1,
        backgroundColor: "#ffa396",
        transition: {
          duration: 0.2,
        },
      }}
      initial="hidden"
      animate="visible"
      variants={pageTransition}
    >
      <h3
        style={{
          textAlign: "center",
          color: "#241909",
          marginTop: "0.3em",
          userSelect:"none"
        }}
      >
        {meal.strMeal}
      </h3>
      <button
        style={{
          background: `url(${meal.strMealThumb}) no-repeat center`,
          backgroundSize: "290px",
        }}
        className="selected-category-meal-button"
        onClick={() => getSelectedMealById()}
      ></button>
    </m.div>
  );
};

export default SelectedCategoryMeal;

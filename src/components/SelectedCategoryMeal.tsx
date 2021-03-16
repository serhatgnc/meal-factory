import { selectedMealCategory } from "global";

type SelectedCategoryMealProps = {
  index: number;
  meal: selectedMealCategory;
};

const SelectedCategoryMeal = ({ index, meal }: SelectedCategoryMealProps) => {
  return (
    <div
    className="selected-category-meal"
    >
      <h3
        style={{
          textAlign: "center",
          color: "#241909",
          marginTop:"0.3em"
        }}
      >
        {meal.strMeal}
      </h3>
      <button
        style={{
          background: `url(${meal.strMealThumb}) no-repeat center`,
          backgroundSize: "270px",
        }}
        className="selected-category-meal-button"
        key={index}
      ></button>
    </div>
  );
};

export default SelectedCategoryMeal;

import { AllMealCategories, selectedMealCategory } from "global";
import { getCategoryMeals } from "src/utils/fetchData";
import { motion as m } from "framer-motion";
import { pageTransition } from "src/utils/constants";

type AllMealCategoryProps = {
  mealCategory: AllMealCategories;
  setAllMealCategories: React.Dispatch<
    React.SetStateAction<AllMealCategories[]>
  >;
  setSelectedCategoryMeals: React.Dispatch<
    React.SetStateAction<selectedMealCategory[] | undefined>
  >;
};

const AllMealCategory = ({
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
    <m.button
      className="mealCategoryButton"
      data-category={mealCategory.strCategory}
      onClick={(e) => getSelectedCategory(e)}
      whileHover={{
        position: "relative",
        zIndex: 1,
        scale: [1, 1.1, 1.05],
        rotate: [0, 5, -5, 0],
        backgroundColor: "#ffa396",
        transition: {
          duration: 0.3,
        },
      }}
      initial="hidden"
      animate="visible"
      variants={pageTransition}
    >
      <div className="mealCategory">
        <h1 style={{ color: "#241909", fontFamily: "Ubuntu" }}>
          {mealCategory.strCategory}
        </h1>
        <img src={mealCategory.strCategoryThumb} alt="" loading="lazy" />
      </div>
    </m.button>
  );
};

export default AllMealCategory;

import { AllMealCategories, selectedMealCategory } from "global";
import { getCategoryMeals } from "src/utils/fetchData";
import { motion as m } from "framer-motion";

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
    <m.button
      className="mealCategoryButton"
      key={index}
      data-category={mealCategory.strCategory}
      onClick={(e) => getSelectedCategory(e)}
      whileHover={{
        position: "relative",
        zIndex: 1,
        scale: [1, 1.1, 1.05],
        rotate: [0, 5, -5, 0],
        transition: {
          duration: 0.3,
        },
      }}
    >
      <div className="mealCategory">
        <h1 style={{ color: "#550527" }}>{mealCategory.strCategory}</h1>
        <img src={mealCategory.strCategoryThumb} alt="" />
      </div>
    </m.button>
  );
};

export default AllMealCategory;

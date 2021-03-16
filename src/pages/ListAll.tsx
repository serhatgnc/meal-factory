import { useEffect, useRef, useState } from "react";
import {
  AllMealCategories,
  MealByName,
  SelectedMeal,
  selectedMealCategory,
} from "global";
import {
  Search,
  AllMealCategory,
  SelectedCategoryMeal,
  SelectedMealComponent,
} from "../components/AllComponents";
import {
  pageTransition,
  scrollFunction,
  topFunction,
} from "src/utils/constants";
import { getAllMealCategories, getMealByName } from "src/utils/fetchData";
import { motion as m } from "framer-motion";

const ListAll = () => {
  const [searchMeal, setSearchMeal] = useState<MealByName[] | undefined>(
    undefined
  );
  const [ingredients, setIngredients] = useState<string[][] | undefined>(
    undefined
  );
  const [allMealCategories, setAllMealCategories] = useState<
    AllMealCategories[]
  >([]);
  const [selectedCategoryMeals, setSelectedCategoryMeals] = useState<
    selectedMealCategory[]
  >();
  const [selectedMeal, setSelectedMeal] = useState<SelectedMeal[] | undefined>(
    undefined
  );
  const [input, setInput] = useState<HTMLInputElement>();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollButton = useRef<HTMLButtonElement>(null);

  const listAllMealCategories = async () => {
    setSelectedMeal([]);
    setSelectedCategoryMeals([]);
    setSearchMeal([]);
    const allMeal = await getAllMealCategories();
    setAllMealCategories(allMeal);
    const input = inputRef?.current;
    if (input) {
      input.value = "";
    }
  };

  const inputFunction = async () => {
    const searchTerm: string | undefined = input?.value;
    if (searchTerm !== "") {
      setSelectedMeal([]);
      setSelectedCategoryMeals([]);
      setAllMealCategories([]);
    }
    if (searchTerm) {
      const meal = await getMealByName(searchTerm);
      const arrayIngredients: string[][] = [];
      meal?.forEach((meal) => {
        const eachArray: string[] = [];
        Object?.entries(meal)?.forEach((elm) => {
          if (elm[0].startsWith("strIngredient") && elm[1]) {
            eachArray.push(elm[1]);
          }
        });
        arrayIngredients.push(eachArray);
      });
      setIngredients(arrayIngredients);
      setSearchMeal(meal);
    }
  };

  window.onscroll = () => {
    scrollFunction(scrollButton);
  };

  useEffect(() => {
    if (inputRef?.current) setInput(inputRef?.current);
  }, []);

  return (
    <div
      className="listall"
      style={selectedMeal ? { backgroundImage: "none" } : {}}
    >
      <m.div
        className="listall-triggers"
        initial="hidden"
        animate="visible"
        variants={pageTransition}
      >
        <m.input
          className="listall-input"
          type="text"
          placeholder="Search Meal by Name"
          onBlur={inputFunction}
          ref={inputRef}
          whileTap={{ scale: 0.95 }}
        />
        <div className="listall-button">
          <m.button
            onClick={listAllMealCategories}
            className="button"
            title="pick a category to list all meals from that category"
            whileTap={{ scale: 0.95 }}
          >
            List All Meal Categories
          </m.button>
        </div>
      </m.div>

      {searchMeal && (
        <div className="search">
          {searchMeal?.map((meal, index) => {
            return (
              <Search
                meal={meal}
                index={index}
                ingredients={ingredients}
                key={index}
              />
            );
          })}
        </div>
      )}
      {allMealCategories && (
        <div className="allMealCategory">
          {allMealCategories?.map((mealCategory, index) => {
            return (
              <AllMealCategory
                index={index}
                key={index}
                mealCategory={mealCategory}
                setAllMealCategories={setAllMealCategories}
                setSelectedCategoryMeals={setSelectedCategoryMeals}
              />
            );
          })}
        </div>
      )}
      {selectedCategoryMeals && (
        <div className="selected-category-meals">
          {selectedCategoryMeals?.map((meal, index) => {
            return (
              <SelectedCategoryMeal
                idMeal={meal.idMeal}
                key={index}
                index={index}
                meal={meal}
                setSelectedMeal={setSelectedMeal}
                setAllMealCategories={setAllMealCategories}
                setSearchMeal={setSearchMeal}
                setSelectedCategoryMeals={setSelectedCategoryMeals}
              />
            );
          })}
        </div>
      )}
      {selectedMeal && (
        <>
          {selectedMeal?.map((meal, index) => {
            return <SelectedMealComponent meal={meal} key={index} />;
          })}
        </>
      )}
      <button
        onClick={() => topFunction()}
        id="toTheTop"
        title="go to top"
        ref={scrollButton}
      >
        <i className="fas fa-arrow-circle-up fa-2x"></i>
      </button>
    </div>
  );
};
export default ListAll;

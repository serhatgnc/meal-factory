import { AllMealCategories, MealByName, selectedMealCategory } from "global";
import { useEffect, useRef, useState } from "react";
import AllMealCategory from "src/components/AllMealCategory";
import Search from "src/components/Search";
import SelectedCategoryMeal from "src/components/SelectedCategoryMeal";
import { getAllMealCategories, getMealByName } from "src/utils/fetchData";

const ListAll = () => {
  const [input, setInput] = useState<HTMLInputElement>();
  const [allMealCategories, setAllMealCategories] = useState<
    AllMealCategories[]
  >([]);
  const [searchMeal, setSearchMeal] = useState<MealByName[] | undefined>(
    undefined
  );
  const [selectedCategoryMeals, setSelectedCategoryMeals] = useState<
    selectedMealCategory[]
  >();
  const [ingredients, setIngredients] = useState<string[][] | undefined>(
    undefined
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollButton = useRef<HTMLButtonElement>(null);

  const listAllMealCategories = async () => {
    setSelectedCategoryMeals([]);
    setSearchMeal([]);
    let allMeal = await getAllMealCategories();
    setAllMealCategories(allMeal);
    let input = inputRef?.current;
    if (input) {
      input.value = "";
    }
  };

  const inputFunction = async () => {
    setSelectedCategoryMeals([]);
    setAllMealCategories([]);
    let searchTerm: string | undefined = input?.value;
    if (searchTerm) {
      let meal = await getMealByName(searchTerm);
      let arrayIngredients: string[][] = [];
      meal?.forEach((meal) => {
        let eachArray: string[] = [];
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
    scrollFunction();
  };
  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollFunction = () => {
    if (scrollButton && scrollButton.current) {
      var buttonElm = scrollButton?.current as HTMLButtonElement;
      if (
        document.documentElement.scrollTop > 20 ||
        document.body.scrollTop > 20
      ) {
        buttonElm.style.display = "inline-block";
      } else {
        buttonElm.style.display = "none";
      }
    }
  };

  // useEffect(() => {
  //   console.log(searchMeal);
  // }, [searchMeal]);
  useEffect(() => {
    if (inputRef?.current) setInput(inputRef?.current);
  }, []);
  useEffect(() => {
    console.log(selectedCategoryMeals);
  }, [selectedCategoryMeals]);
  return (
    <div className="listall">
      <div className="listall-triggers">
        <input
          className="listall-input"
          type="text"
          placeholder="Search Meal by Name"
          onBlur={inputFunction}
          ref={inputRef}
        />
        <div className="listall-button">
          <button
            onClick={listAllMealCategories}
            className="button"
            title="pick a category to list all meals from that category"
          >
            List All Meal Categories
          </button>
        </div>
      </div>
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
              <SelectedCategoryMeal key={index} index={index} meal={meal} />
            );
          })}
        </div>
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

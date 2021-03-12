import { AllMealCategories, MealByName } from "global";
import { useRef, useState } from "react";
import { getAllMealCategories, getMealByName } from "src/utils/fetchData";

const ListAll = () => {
  const [allMealCategories, setAllMealCategories] = useState<
    AllMealCategories[]
  >([]);
  const [searchMeal, setSearchMeal] = useState<MealByName[]>([]);
  const [ingredients, setIngredients] = useState<String[][]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollButton = useRef<HTMLButtonElement>(null);

  const listAllMealCategories = async () => {
    let allMeal = await getAllMealCategories();
    console.log(allMeal);
  };

  const inputFunction = async () => {
    let searchTerm = inputRef?.current?.value;
    if (searchTerm) {
      let meal = await getMealByName(searchTerm);
      let arrayIngredients: String[][] = [];
      meal?.forEach((meal) => {
        let eachArray: String[] = [];
        Object?.entries(meal)?.forEach((elm) => {
          if (elm[0].startsWith("strIngredient") && elm[1]) {
            eachArray.push(elm[1]);
          }
        });
        arrayIngredients.push(eachArray);
      });
      setIngredients(arrayIngredients);
      setSearchMeal(meal);
    }else{
      
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

  return (
    <div>
      <div className="listall-triggers">
        <input
          className="listall-input"
          type="text"
          placeholder="Search Meal by Name"
          onBlur={() => inputFunction()}
          ref={inputRef}
        />
        <div className="listall-button">
          <button onClick={() => listAllMealCategories()} className="button">
            List All Meal Categories
          </button>
        </div>
      </div>
      {searchMeal && (
        <div className="search">
          {searchMeal?.map((meal, index) => {
            return (
              <div className="searchedMeal" key={index}>
                <h2 style={{ color: "#550527" }}>{meal.strMeal}</h2>
                <img className="searchMealImg" src={meal.strMealThumb} alt="" />
                <h4 style={{ color: "#550527" }}>
                  Category : {meal.strCategory}
                </h4>
                <h4 style={{ alignSelf: "start", color: "#550527" }}>
                  Instructions
                </h4>
                <p style={{ textAlign: "start" }}>{meal.strInstructions}</p>
                <br />
                <h4 style={{ alignSelf: "start", color: "#550527" }}>
                  Ingredients{" "}
                </h4>
                <div className="list-all-ingredients">
                  {ingredients[index].map((ingredient, ownIndex) => {
                    return (
                      <div
                        className="list-all-ingredient"
                        key={index + ownIndex}
                      >
                        <img
                          src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
                          alt=""
                        />
                        <h5 style={{ textAlign: "center" }}>{ingredient}</h5>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {}
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

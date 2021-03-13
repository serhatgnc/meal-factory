import { AllMealCategories, MealByName } from 'global';
import { useEffect, useRef, useState } from 'react';
import { getAllMealCategories, getMealByName } from 'src/utils/fetchData';

const ListAll = () => {
  const [input, setInput] = useState<HTMLInputElement>();
  const [allMealCategories, setAllMealCategories] = useState<
    AllMealCategories[]
  >([]);
  const [searchMeal, setSearchMeal] = useState<MealByName[] | undefined>(
    undefined
  );
  const [ingredients, setIngredients] = useState<String[][] | undefined>(
    undefined
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollButton = useRef<HTMLButtonElement>(null);

  const listAllMealCategories = async () => {
    setSearchMeal([]);
    let allMeal = await getAllMealCategories();
    setAllMealCategories(allMeal);
    let input = inputRef?.current;
    if (input) {
      input.value = '';
    }
  };

  const inputFunction = async () => {
    setAllMealCategories([]);
    let searchTerm: string | undefined = input?.value;
    if (searchTerm) {
      let meal = await getMealByName(searchTerm);
      let arrayIngredients: String[][] = [];
      meal?.forEach((meal) => {
        let eachArray: String[] = [];
        Object?.entries(meal)?.forEach((elm) => {
          if (elm[0].startsWith('strIngredient') && elm[1]) {
            eachArray.push(elm[1]);
          }
        });
        arrayIngredients.push(eachArray);
      });
      setIngredients(arrayIngredients);
      setSearchMeal(meal);
    }
  };

  const getSelectedCategory = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log(e.currentTarget.getAttribute('data-category'));
  };

  window.onscroll = () => {
    scrollFunction();
  };
  const topFunction = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollFunction = () => {
    if (scrollButton && scrollButton.current) {
      var buttonElm = scrollButton?.current as HTMLButtonElement;
      if (
        document.documentElement.scrollTop > 20 ||
        document.body.scrollTop > 20
      ) {
        buttonElm.style.display = 'inline-block';
      } else {
        buttonElm.style.display = 'none';
      }
    }
  };

  useEffect(() => {
    console.log(allMealCategories);
  }, [allMealCategories]);

  useEffect(() => {
    if (inputRef?.current) setInput(inputRef?.current);
  }, []);

  return (
    <div>
      <div className="listall-triggers">
        <input
          className="listall-input"
          type="text"
          placeholder="Search Meal by Name"
          onBlur={inputFunction}
          ref={inputRef}
        />
        <div className="listall-button">
          <button onClick={listAllMealCategories} className="button">
            List All Meal Categories
          </button>
        </div>
      </div>
      {searchMeal && (
        <div className="search">
          {searchMeal?.map((meal, index) => {
            return (
              <div className="searchedMeal" key={index}>
                <h2 style={{ color: '#550527' }}>{meal.strMeal}</h2>
                <img className="searchMealImg" src={meal.strMealThumb} alt="" />
                <h4 style={{ color: '#550527' }}>
                  Category : {meal.strCategory}
                </h4>
                <h4 style={{ alignSelf: 'start', color: '#550527' }}>
                  Instructions
                </h4>
                <p style={{ textAlign: 'start' }}>{meal.strInstructions}</p>
                <br />
                <h4 style={{ alignSelf: 'start', color: '#550527' }}>
                  Ingredients{' '}
                </h4>
                <div className="list-all-ingredients">
                  {ingredients && (
                    <>
                      {ingredients[index]?.map((ingredient, ownIndex) => {
                        return (
                          <div
                            className="list-all-ingredient"
                            key={`${index}${ownIndex}`}
                          >
                            <img
                              src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
                              alt=""
                            />
                            <h5 style={{ textAlign: 'center' }}>
                              {ingredient}
                            </h5>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {allMealCategories && (
        <div className="allMealCategory">
          {allMealCategories?.map((mealCategory, index) => {
            return (
              <button
                className="mealCategory"
                key={index}
                data-category={mealCategory.strCategory}
                onClick={(e) => getSelectedCategory(e)}
              >
                <h1 style={{ color: '#550527' }}>{mealCategory.strCategory}</h1>
                <img src={mealCategory.strCategoryThumb} alt="" />
                <p>{mealCategory.strCategoryDescription}</p>
              </button>
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

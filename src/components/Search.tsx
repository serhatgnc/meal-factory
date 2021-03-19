import { motion as m } from "framer-motion";
import { RandomMeal } from "global";
import { pageTransition } from "src/utils/constants";

type SearchProps = {
  meal: RandomMeal;
  index: number;
  ingredients: string[][] | undefined;
};

const Search = ({ meal, index, ingredients }: SearchProps) => {
  return (
    <m.div
      className="searchedMeal"
      key={index}
      initial="hidden"
      animate="visible"
      variants={pageTransition}
    >
      <h1 style={{ color: "#4f000b" }}>{meal.strMeal}</h1>
      <img
        className="searchMealImg"
        src={meal.strMealThumb}
        alt=""
        loading="lazy"
      />
      <h4 style={{ color: "#4f000b" }}>Origin : {meal.strArea}</h4>
      <h4 style={{ color: "#4f000b" }}>Category : {meal.strCategory}</h4>
      <h3 style={{ alignSelf: "start", color: "#4f000b" }}>Instructions</h3>
      <br />
      <p className="search-instructions">{meal.strInstructions}</p>
      <br />
      <h3 style={{ alignSelf: "start", color: "#4f000b" }}>Ingredients </h3>
      <br />
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
                    loading="lazy"
                  />
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: 400,
                      fontStyle: "italic",
                    }}
                  >
                    {ingredient}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </m.div>
  );
};

export default Search;

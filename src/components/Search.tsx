import { RandomMeal } from "global";

type SearchProps = {
  meal: RandomMeal;
  index: number;
  ingredients: string[][] | undefined;
};

const Search = ({ meal, index, ingredients }: SearchProps) => {
  return (
    <div className="searchedMeal" key={index}>
      <h1 style={{ color: "#550527" }}>{meal.strMeal}</h1>
      <img
        className="searchMealImg"
        src={meal.strMealThumb}
        alt=""
      />
      <h4 style={{ color: "#550527" }}>Origin : {meal.strArea}</h4>
      <h4 style={{ color: "#550527" }}>Category : {meal.strCategory}</h4>
      <h3 style={{ alignSelf: "start", color: "#550527" }}>Instructions</h3>
      <br />
      <p className="search-instructions">{meal.strInstructions}</p>
      <br />
      <h3 style={{ alignSelf: "start", color: "#550527" }}>Ingredients </h3>
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
                  />
                  <p
                    style={{
                      textAlign: "center",
                      fontWeight: 300,
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
    </div>
  );
};

export default Search;

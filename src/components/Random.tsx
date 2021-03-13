import { RandomMeal } from 'global';
import { useEffect, useState } from 'react';
import { debounce } from 'src/utils/debounce';
import { getRandomMeal } from '../utils/fetchData';

const Random = () => {
  const [randomMeal, setRandomMeal] = useState<RandomMeal[] | undefined>(
    undefined
  );
  const [ingredients, setIngredients] = useState<String[] | undefined>(
    undefined
  );
  const [error, setError] = useState<string | undefined>(undefined);
  const [counter, setCounter] = useState(0);

  const randomMealFunction = async () => {
    try {
      const meal = await getRandomMeal();
      const arrayIngredient: String[] = [];

      Object?.entries(meal[0])?.forEach((ingredient) => {
        if (ingredient[0].startsWith('strIngredient') && ingredient[1]) {
          arrayIngredient.push(ingredient[1]);
        }
      });

      setRandomMeal(meal);
      setIngredients(arrayIngredient);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    randomMealFunction();
  }, []);

  if (error) {
    return <div>Error...!</div>;
  }

  return (
    <div className="random">
      <button onClick={() => setCounter((prevState) => prevState + 1)}>
        {counter}
      </button>
      {randomMeal && (
        <>
          <div className="img-random">
            <img src={randomMeal[0]?.strMealThumb} alt="" />
            <p style={{ fontWeight: 500 }}>Origin : {randomMeal[0]?.strArea}</p>
            <p style={{ fontWeight: 500 }}>
              Category : {randomMeal[0]?.strCategory}
            </p>
            <div className="random-button-div">
              <button
                className="button"
                onClick={debounce(randomMealFunction, 1000)}
              >
                Roll Again
              </button>
            </div>
          </div>
          <div className="text-random">
            <h1 style={{ textAlign: 'center' }}>{randomMeal[0]?.strMeal}</h1>
            <h3 style={{ opacity: 0.9, userSelect: 'none' }}>Instructions</h3>
            <p>{randomMeal[0]?.strInstructions}</p>
            <hr className="rounded" />
            <h3 style={{ opacity: 0.9, userSelect: 'none' }}>Ingredients</h3>
            <div className="ingredients">
              {ingredients?.map((ingredient, index) => {
                return (
                  <div key={index} className="ingredient">
                    <img
                      src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
                      alt=""
                    />
                    <p style={{ fontSize: '0.75em' }}>{ingredient}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Random;

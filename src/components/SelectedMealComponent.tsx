import { motion as m } from "framer-motion";
import { RandomMeal } from "global";
import { useEffect, useState } from "react";
import { pageTransition } from "src/utils/constants";

type SelectedMealComponentProps = {
  meal: RandomMeal;
};

const SelectedMealComponent = ({ meal }: SelectedMealComponentProps) => {
  const [selectedMealIngredients, setSelectedMealIngredients] = useState<
    string[] | undefined
  >(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleMealIngredients = () => {
    try {
      const arrayIngredient: string[] = [];
      Object?.entries(meal)?.forEach((ingredient) => {
        if (ingredient[0].startsWith("strIngredient") && ingredient[1]) {
          arrayIngredient.push(ingredient[1]);
        }
      });
      setSelectedMealIngredients(arrayIngredient);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    handleMealIngredients();
  }, []);

  return (
    <m.div
      className="selected-meal"
      initial="hidden"
      animate="visible"
      variants={pageTransition}
    >
      <div className="img-random">
        <img src={meal.strMealThumb} alt="" />
        <p style={{ fontWeight: 500 }}>Origin : {meal.strArea}</p>
        <p style={{ fontWeight: 500 }}>Category : {meal.strCategory}</p>
      </div>
      <div className="text-random">
        <h1 style={{ textAlign: "center" }}>{meal.strMeal}</h1>
        <br />
        <h4 style={{ opacity: 0.9, userSelect: "none" }}>Instructions</h4>
        <p className="instruction-random">{meal.strInstructions}</p>
        <hr className="rounded" />
        <h3 style={{ opacity: 0.9, userSelect: "none" }}>Ingredients</h3>
        <div className="ingredients">
          {selectedMealIngredients?.map((ingredient, index) => {
            return (
              <div key={index} className="ingredient">
                <img
                  src={`https://www.themealdb.com/images/ingredients/${ingredient}.png`}
                  alt=""
                />
                <p
                  style={{
                    fontSize: "0.75em",
                    fontWeight: 300,
                    color: "#241909",
                  }}
                >
                  {ingredient}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {error && <div>Error...!</div>}
    </m.div>
  );
};

export default SelectedMealComponent;

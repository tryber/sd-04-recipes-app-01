import React from 'react';
import meals from '../testttt/meals';

const CardsFood = () => {
  let comidas = [];

  if (meals.meals.length > 12) {
    for (let index = 0; index < 12; index++) {
      comidas.push(meals.meals[index]);
    }
  } else comidas = meals.meals;

  return (
    <div>
      {comidas.map((item, i) => (
        <div key={item.idMeal}>
          <img
            key={i}
            src={item.strMealThumb}
            width="200"
            data-testid={`${i}-card-img`}
            alt={item.strMeal}
          />
          <p key={item.strMeal} data-testid={`${i}-card-name`}>
            {item.strMeal}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardsFood;

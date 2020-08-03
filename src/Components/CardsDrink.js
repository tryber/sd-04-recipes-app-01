import React from 'react';
import drinks from '../testttt/drinks';

const CardsDrink = () => {
  let bebidas = [];

  if (drinks.drinks.length > 12) {
    for (let index = 0; index < 12; index++) {
      bebidas.push(drinks.drinks[index]);
    }
  } else bebidas = drinks.drinks;

  return (
    <div>
      {bebidas.map((item, i) => (
        <div key={item.idDrink}>
          <img
            key={i}
            src={item.strDrinkThumb}
            width="200"
            data-testid={`${i}-card-img`}
            alt={item.strDrink}
          />
          <p key={item.strDrink} data-testid={`${i}-card-name`}>
            {item.strDrink}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CardsDrink;

import React from 'react';
import { getIngredients, getLocalStorage } from '../helpers/index';
import save from '../helpers/index';

const addToStorageFistTime = (local, actualData, drinkOrFood, event) => ({
  ...local,
  [drinkOrFood.key]: {
    ...local[drinkOrFood.key],
    [actualData[drinkOrFood.id]]: [event.target.name],
  },
});
const addToStorage = (local, actualData, drinkOrFood, event) => ({
  ...local,
  [drinkOrFood.key]: {
    ...local[drinkOrFood.key],
    [actualData[drinkOrFood.id]]: [
      ...local[drinkOrFood.key][actualData[drinkOrFood.id]],
      event.target.name,
    ],
  },
});
const deleteStorage = (local, actualData, drinkOrFood, event) => {
  const array = [];
  local[drinkOrFood.key][actualData[drinkOrFood.id]].forEach((ingredient) => {
    if (ingredient !== event.target.name) {
      array.push(ingredient);
    }
  });
  return array;
};
const decorationCheck = (event) => {
  let element = event.target.style.textDecoration;
  if (element === 'line-through') {
    return (element = 'none');
  }
  return (element = 'line-through');
};
const deleteOrAdd = (event, actualData, drinkOrFood, local, Ingredients) => {
  if (!Ingredients.includes(event.target.name)) {
    return addToStorage(local, actualData, drinkOrFood, event);
  }
  let newlocal = [];
  newlocal = deleteStorage(local, actualData, drinkOrFood, event);
  return {
    ...local,
    [drinkOrFood.key]: { [actualData[drinkOrFood.id]]: newlocal },
  };
};
const handleInput = (
  event,
  actualData,
  drinkOrFood,
  Ingredients,
  path,
  setRender,
  render,
) => {
  let setToStore = {};
  if (path === '/comidas/:id/in-progress') {
    setToStore = { meals: { [actualData.idMeal]: [] } };
  } else {
    setToStore = { cocktails: { [actualData.idDrink]: [] } };
  }
  const local = getLocalStorage('inProgressRecipes');
  if (
    !local[drinkOrFood.key] ||
    !local[drinkOrFood.key][actualData[drinkOrFood.id]]
  ) {
    setToStore = addToStorageFistTime(local, actualData, drinkOrFood, event);
  } else {
    setToStore = deleteOrAdd(
      event,
      actualData,
      drinkOrFood,
      local,
      Ingredients,
    );
  }
  setRender(!render);
  save('inProgressRecipes', setToStore);
  return decorationCheck(event);
};
const renderInputs = (
  Ingredients,
  actualData,
  drinkOrFood,
  path,
  render,
  setRender,
  index,
  ingredient,
  handleInputRendered,
) => (
  Ingredients.includes(ingredient) ? (
    <input
      type="checkbox"
      name={ingredient}
      data-testid="ingredient-step"
      onClick={(event) =>
        handleInputRendered(
          event,
          actualData,
          drinkOrFood,
          Ingredients,
          path,
          setRender,
          render,
        )
      }
      defaultChecked
    />
  ) : (
    <input
      type="checkbox"
      name={ingredient}
      onClick={(event) =>
        handleInputRendered(
          event,
          actualData,
          drinkOrFood,
          Ingredients,
          path,
          setRender,
          render,
        )
      }
    />
  )
);
const renderIngredientCheckBox = (
  actualData,
  drinkOrFood,
  path,
  render,
  setRender,
  Ingredients,
  decorationDefault,
) => (
  <div>
    <p data-testid="recipe-category">{actualData.strCategory}</p>
    <p>Ingredients:</p>
    {getIngredients(actualData).map(({ ingredient, measure }, index) => (
      <div data-testid={`${index}-ingredient-step`}>
        {renderInputs(
          Ingredients,
          actualData,
          drinkOrFood,
          path,
          render,
          setRender,
          index,
          ingredient,
          handleInput,
        )}
        {Ingredients.includes(ingredient) ? (
          <label htmlFor={ingredient} style={decorationDefault}>
            {measure} {ingredient}
          </label>
        ) : (
          <label htmlFor={ingredient}>
            {measure} {ingredient}
          </label>
        )}
      </div>
    ))}
  </div>
);

export default renderIngredientCheckBox;

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getIngredients, getLocalStorage } from '../helpers/index';
import save from '../helpers/index';
import Icons from '../Components/Icons';

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
      data-testid={`${index}-ingredient-step`}
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
      checked
    />
  ) : (
    <input
      type="checkbox"
      name={ingredient}
      data-testid={`${index}-ingredient-step`}
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
      <div>
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

const btnTrue = () => (
  <div className="btnPosition">
    <button className="start-recipe-btn" type='button'>Finalizar Receita</button>
  </div>
)

const btnFalse = () => (
  <button type='button' className="start-recipe-btn" disabled>Finalizar Receita</button>
)

const renderButton = (actualData, drinkOrFood, render, setRender) => {
  const store = getLocalStorage('inProgressRecipes');
  const key = drinkOrFood.key;
  const value = key[[actualData[drinkOrFood.id]]];
  const ingredientsOnTheBoard = !store[key] || !store[value] ? [] : store[value];
  const compareForButton = getIngredients(actualData).map((Ingredient) => Ingredient.ingredient);
  if (ingredientsForButton.length === ingredientsOnTheBoard.length) {
    return btnTrue();
  }
  return btnFalse();
};

const MeaslInProgress = ({
  match: { path },
  detailsDrink,
  detailsFood,
  match,
}) => {
  const [render, setRender] = useState(false);
  const decorationDefault = { 'text-decoration': 'line-through' };
  let actualData = [];
  let drinkOrFood = {
    id: '',
    key: '',
  };
  if (path === '/comidas/:id/in-progress') {
    actualData = detailsFood.meals[0];
    drinkOrFood = { id: 'idMeal', key: 'meals' };
  }
  if (path === '/bebidas/:id/in-progress') {
    actualData = detailsDrink.drinks[0];
    drinkOrFood = { id: 'idDrink', key: 'cocktails' };
  }
  const localStorage = getLocalStorage('inProgressRecipes');
  const Ingredients =
    !localStorage[drinkOrFood.key] ||
    !localStorage[drinkOrFood.key][actualData[drinkOrFood.id]]
      ? []
      : localStorage[drinkOrFood.key][actualData[drinkOrFood.id]];
  return (
    <div>
      <img
        src={actualData.strMealThumb || actualData.strDrinkThumb}
        alt={actualData.strMeal || actualData.strDrink}
        data-testid="recipe-photo"
        width="200"
      />
      <h2 data-testid="recipe-title">
        {actualData.strMeal || actualData.strDrink}
      </h2>
      <Icons
        pathName={match}
        detailsDrink={actualData}
        detailsRecipe={actualData}
      />
      {renderIngredientCheckBox(
        actualData,
        drinkOrFood,
        path,
        render,
        setRender,
        Ingredients,
        decorationDefault,
      )}
      <p>Instructions</p>
      <p data-testid="instructions">{actualData.strInstructions}</p>
      {renderButton(actualData, drinkOrFood, render, setRender)}
    </div>
  );
};

MeaslInProgress.propTypes = {
  match: PropTypes.arrayOf(String).isRequired,
  detailsDrink: PropTypes.arrayOf(Object).isRequired,
  detailsFood: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  detailsFood: state.detailsFoodsReducer.detailsFoods,
  detailsDrink: state.detailsDrinksReducer.detailsDrinks,
});

export default connect(mapStateToProps)(MeaslInProgress);

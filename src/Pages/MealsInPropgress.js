import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getIngredients, getLocalStorage } from '../helpers/index';
import save from '../helpers/index';
import Icons from '../Components/Icons';
import Input from '../Components/MealsInProgressInput';
import { getDetailsDrinks, getDetailsFoods } from '../Redux/Actions';
import Phrases from '../Components/Phrases';

const verifyingTags = (string) => {
  if (!string) return [];
  if (string.includes(',')) {
    const newTags = string.split(',');
    return newTags;
  }
  return [string];
};

const gettingDate = () => (
  `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
);

const verifyingRoute = (actualData, drinkOrFood) => {
  if (drinkOrFood.id === 'idMeal') {
    return {
      id: actualData.idMeal,
      type: 'comida',
      area: actualData.strArea,
      category: actualData.strCategory,
      alcoholicOrNot: '',
      name: actualData.strMeal,
      image: actualData.strMealThumb,
      doneDate: gettingDate(),
      tags: verifyingTags(actualData.strTags),
    };
  }
  return {
    id: actualData.idDrink,
    type: 'bebida',
    area: actualData.strArea,
    category: actualData.strCategory,
    alcoholicOrNot: actualData.strAcoholic,
    name: actualData.strDrink,
    image: actualData.strDrinkThumb,
    doneDate: gettingDate(),
    tags: verifyingTags(actualData.strTags),
  };
};

const submitClick = (actualData, drinkOrFood, setRedirect) => {
  const local = getLocalStorage('doneRecipes');
  const setToStorage = [...local, verifyingRoute(actualData, drinkOrFood)];
  save('doneRecipes', setToStorage);
  setRedirect(true);
};

const btnTrue = (actualData, drinkOrFood, setRedirect) => (
  <div className="btnPosition">
    <button
      data-testid="finish-recipe-btn"
      onClick={() => submitClick(actualData, drinkOrFood, setRedirect)}
      className="start-recipe-btn" type="button"
    >Finalizar Receita</button>
  </div>
);
const btnFalse = () => (
  <div className="btnPosition">
    <button data-testid="finish-recipe-btn" className="start-recipe-btn" type="button" disabled>
      Finalizar Receita
    </button>
  </div>
);
const renderButton = (actualData, drinkOrFood, setRedirect) => {
  const store = getLocalStorage('inProgressRecipes');
  const ingredientsOnTheBoard =
    !store[drinkOrFood.key] ||
      !store[drinkOrFood.key][actualData[drinkOrFood.id]]
      ? [] : store[drinkOrFood.key][actualData[drinkOrFood.id]];
  const compareForButton = getIngredients(actualData).map((Ingredient) => Ingredient.ingredient);
  if (compareForButton.length === ingredientsOnTheBoard.length) {
    return btnTrue(actualData, drinkOrFood, setRedirect);
  }
  return btnFalse();
};

const verifyingLoading = (path, isLoadingDrinkDetails, isLoadingFoodDetails) => {
  if (path === '/bebidas/:id/in-progress') return isLoadingDrinkDetails;
  return isLoadingFoodDetails;
};

const verifyingActualData = (path, detailsFood, detailsDrink) => {
  if (path === '/comidas/:id/in-progress') {
    return {
      actualData: detailsFood.meals[0],
      drinkOrFood: { id: 'idMeal', key: 'meals' },
    };
  }
  return {
    actualData: detailsDrink.drinks[0],
    drinkOrFood: { id: 'idDrink', key: 'cocktails' },
  };
};

const MeaslInProgress = ({ match: { path, params: { id } }, detailsDrink, detailsFood, match,
  detailsDrinkRequisition, detailsFoodRequisition, isLoadingDrinkDetails, detailsFoodsError,
  isLoadingFoodDetails, detailsDrinksError }) => {
  const [render, setRender] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const decorationDefault = { 'text-decoration': 'line-through' };
  const isLoading = verifyingLoading(path, isLoadingDrinkDetails, isLoadingFoodDetails);
  useEffect(() => {
    if (path === '/comidas/:id/in-progress') {
      detailsFoodRequisition(id);
    } else {
      detailsDrinkRequisition(id);
    }
  }, [detailsFoodRequisition, detailsDrinkRequisition, id]);
  if (detailsFoodsError !== '' || detailsDrinksError !== '') return <div>Failed to fetch</div>;
  if (isLoading) return <Phrases />;
  const { drinkOrFood, actualData } = verifyingActualData(path, detailsFood, detailsDrink);
  const localStorage = getLocalStorage('inProgressRecipes');
  const Ingredients =
    !localStorage[drinkOrFood.key] ||
      !localStorage[drinkOrFood.key][actualData[drinkOrFood.id]]
      ? []
      : localStorage[drinkOrFood.key][actualData[drinkOrFood.id]];
  if (redirect) return <Redirect to="/receitas-feitas" />;
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
      {Input(
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
      {renderButton(actualData, drinkOrFood, setRedirect)}
    </div>
  );
};

MeaslInProgress.propTypes = {
  detailsDrink: PropTypes.shape(Object).isRequired,
  detailsDrinkRequisition: PropTypes.func.isRequired,
  detailsFood: PropTypes.shape(Object).isRequired,
  detailsFoodRequisition: PropTypes.func.isRequired,
  isLoadingDrinkDetails: PropTypes.bool.isRequired,
  isLoadingFoodDetails: PropTypes.bool.isRequired,
  match: PropTypes.shape(Object).isRequired,
  detailsFoodsError: PropTypes.string.isRequired,
  detailsDrinksError: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  detailsFood: state.detailsFoodsReducer.detailsFoods,
  detailsFoodsError: state.detailsFoodsReducer.detailsFoodsError,
  detailsDrink: state.detailsDrinksReducer.detailsDrinks,
  detailsDrinksError: state.detailsDrinksReducer.detailsDrinksError,
  isLoadingDrinkDetails: state.detailsDrinksReducer.isLoading,
  isLoadingFoodDetails: state.detailsFoodsReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  detailsDrinkRequisition: (id) => dispatch(getDetailsDrinks(id)),
  detailsFoodRequisition: (id) => dispatch(getDetailsFoods(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MeaslInProgress);

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getIngredients, getLocalStorage } from '../helpers/index';
import save from '../helpers/index';
import Icons from '../Components/Icons';
import Input from '../Components/MealsInProgressInput';
import { getDetailsDrinks, getDetailsFoods } from '../Redux/Actions';
import { Redirect } from 'react-router-dom';

const verifyingRoute = (actualData, drinkOrFood) => {
  if (drinkOrFood.id === 'strMeal') {
    return {
      id: actualData.idMeal,
      type: 'comida',
      area: actualData.strArea,
      category: actualData.strCategory,
      alcoholicOrNot: '',
      name: actualData.strMeal,
      image: actualData.strMealThumb,
      doneDate: new Date,
      tags: (!actualData.strTags) ? [] : actualData.strTags,
    }
  }
  return {
    id: actualData.idDrink,
    type: 'bebida',
    area: actualData.strArea,
    category: actualData.strCategory,
    alcoholicOrNot: actualData.strAcoholic,
    name: actualData.strDrink,
    image: actualData.strDrinkThumb,
    doneDate: new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear(),
    tags: (!actualData.strTags) ? [] : actualData.strTags,
  }
}

const submitClick = (actualData, drinkOrFood, setRedirect) => {
  const local = getLocalStorage('doneRecipes');
  const setToStorage = [...local, verifyingRoute(actualData, drinkOrFood)]
  save('doneRecipes', setToStorage)
  setRedirect(true)
}

const btnTrue = (actualData, drinkOrFood, setRedirect) => (
  <div className="btnPosition">
    <button data-testid="finish-recipe-btn" onClick={() => submitClick(actualData, drinkOrFood, setRedirect)} className="start-recipe-btn" type="button">Finalizar Receita</button>
  </div>
);
const btnFalse = () => (
  <div className="btnPosition">
    <button data-testid="finish-recipe-btn" className="start-recipe-btn" type="button" disabled>Finalizar Receita</button>
  </div>
);
const renderButton = (actualData, drinkOrFood, setRedirect) => {
  const store = getLocalStorage('inProgressRecipes');
  const ingredientsOnTheBoard = (!store[drinkOrFood.key] || !store[drinkOrFood.key][actualData[drinkOrFood.id]]) ? [] : store[drinkOrFood.key][actualData[drinkOrFood.id]];
  const compareForButton = getIngredients(actualData).map((Ingredient) => Ingredient.ingredient);
  if (compareForButton.length === ingredientsOnTheBoard.length) {
    return btnTrue(actualData, drinkOrFood, setRedirect);
  }
  return btnFalse();
};
const MeaslInProgress = ({ match: { path, params: {id} }, detailsDrink, detailsFood, match, detailsDrinkRequisition, detailsFoodRequisition, isLoadingDrinkDetails, isLoadingFoodDetails }) => {
  console.log(match)
  const [render, setRender] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const decorationDefault = { 'text-decoration': 'line-through' };
  let actualData = [];
  let drinkOrFood = { id: '', key: '' };
  let isLoading = isLoadingFoodDetails
  useEffect(() => {
    if (path === '/comidas/:id/in-progress') {
      detailsFoodRequisition(id);
    } else {
      detailsDrinkRequisition(id);
    }
    }, [detailsFoodRequisition, detailsDrinkRequisition, id]);
  if (path === '/bebidas/:id/in-progress') isLoading = isLoadingDrinkDetails
  if (isLoading) return <div>Loading...</div>
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
  if (redirect) return <Redirect to="/receitas-feitas" />
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
  match: PropTypes.arrayOf(String).isRequired,
  detailsDrink: PropTypes.arrayOf(Object).isRequired,
  detailsFood: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  detailsFood: state.detailsFoodsReducer.detailsFoods,
  detailsDrink: state.detailsDrinksReducer.detailsDrinks,
  isLoadingDrinkDetails: state.detailsDrinksReducer.isLoading,
  isLoadingFoodDetails: state.detailsFoodsReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  detailsDrinkRequisition: (id) => dispatch(getDetailsDrinks(id)),
  detailsFoodRequisition: (id) => dispatch(getDetailsFoods(id)),
});

export default connect(mapStateToProps,mapDispatchToProps)(MeaslInProgress);

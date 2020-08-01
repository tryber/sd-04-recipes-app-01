import getFood from '../../services/index';
// import getDrink from '../../services'

export const CHANGE_INPUT = 'CHANGE_INPUT';
export const REDIRECT = 'REDIRECT';
export const REQUESTING_FOOD = 'REQUESTING_FOOD';
export const REQUEST_FOOD_SUCCESS = 'REQUEST_FOOD_SUCCESS';
export const REQUEST_FOOD_ERROR = 'REQUEST_FOOD_ERROR';
export const REQUESTING_DRINK = 'REQUESTING_DRINK';
export const REQUEST_DRINK_SUCCESS = 'REQUEST_DRINK_SUCCESS';
export const REQUEST_DRINK_ERROR = 'REQUEST_DRINK_ERROR';
export const REQUESTING_CATEGORIES_FOOD = 'REQUESTING_CATEGORIES_FOOD';
export const REQUEST_CATEGORIES_FOOD_SUCCESS = 'REQUEST_CATEGORIES_FOOD_SUCCESS';
export const REQUEST_CATEGORIES_FOOD_ERROR = 'REQUEST_CATEGORIES_FOOD_ERROR';
export const REQUESTING_CATEGORIES_DRINK = 'REQUESTING_CATEGORIES_DRINK';
export const REQUEST_CATEGORIES_DRINK_SUCCESS = 'REQUEST_CATEGORIES_DRINK_SUCCESS';
export const REQUEST_CATEGORIES_DRINK_ERROR = 'REQUEST_CATEGORIES_DRINK_ERROR';

export const changeInputAct = ({ name, value }) => ({ type: CHANGE_INPUT, name, value });

export const redirectAct = () => ({ type: REDIRECT });

const requestingFood = () => ({
  type: REQUESTING_FOOD,
});

const requestFoodSuccess = (data) => ({
  type: REQUEST_FOOD_SUCCESS,
  data,
});

const requestFoodError = (error) => ({
  type: REQUEST_FOOD_ERROR,
  error,
});

const requestingDrink = () => ({
  type: REQUESTING_DRINK,
});

const requestDrinkSuccess = (data) => ({
  type: REQUEST_DRINK_SUCCESS,
  data,
});

const requestDrinkError = (error) => ({
  type: REQUEST_DRINK_ERROR,
  error,
});

const requestingCategoriesDrink = () => ({
  type: REQUESTING_CATEGORIES_DRINK,
});

const requestCategoriesDrinkSuccess = (data) => ({
  type: REQUEST_CATEGORIES_DRINK_SUCCESS,
  data,
});

const requestCategoriesDrinkError = (error) => ({
  type: REQUEST_CATEGORIES_DRINK_ERROR,
  error,
});

const requestingCategoriesFood = () => ({
  type: REQUESTING_CATEGORIES_FOOD,
});

const requestCategoriesFoodSuccess = (data) => ({
  type: REQUEST_CATEGORIES_FOOD_SUCCESS,
  data,
});

const requestCategoriesFoodError = (error) => ({
  type: REQUEST_CATEGORIES_FOOD_ERROR,
  error,
});

export function getFoods(filter, food) {
  return (dispatch) => {
    requestingFood();

    return getFood(filter, food).then(
      (data) => dispatch(requestFoodSuccess(data)),
      (error) => dispatch(requestFoodError(error)),
    );
  };
}

export function getDrinks(filter, drink) {
  return (dispatch) => {
    requestingDrink();

    return getDrink(filter, drink).then(
      (data) => dispatch(requestDrinkSuccess(data)),
      (error) => dispatch(requestDrinkError(error)),
    );
  };
}

export function getCategoriesFoods() {
  return (dispatch) => {
    requestingCategoriesFood();

    return getCategoriesFood().then(
      (data) => dispatch(requestCategoriesFoodSuccess(data)),
      (error) => dispatch(requestCategoriesFoodError(error)),
    );
  };
}

export function getCategoriesDrinks() {
  return (dispatch) => {
    requestingCategoriesDrink();

    return getCategoriesDrink().then(
      (data) => dispatch(requestCategoriesDrinkSuccess(data)),
      (error) => dispatch(requestCategoriesDrinkError(error)),
    );
  };
}

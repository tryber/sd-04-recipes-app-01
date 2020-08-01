import {
  REQUESTING_CATEGORIES_FOOD,
  REQUEST_CATEGORIES_FOOD_SUCCESS,
  REQUEST_CATEGORIES_FOOD_ERROR,
} from '../Actions/index';

const INITIAL_STATE = {
  isLoading: false,
  categoriesDrinks: {},
  categoriesDrinksError: '',
};

function categoriesDrinkRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUESTING_CATEGORIES_FOOD:
      return { ...state, isLoading: true };
    case REQUEST_CATEGORIES_FOOD_SUCCESS:
      return { ...state, categoriesDrinks: action.data, isLoading: false };
    case REQUEST_CATEGORIES_FOOD_ERROR:
      return { ...state, categoriesDrinksError: action.error, isLoading: false };
    default:
      return state;
  }
}

export default categoriesDrinkRequestReducer;

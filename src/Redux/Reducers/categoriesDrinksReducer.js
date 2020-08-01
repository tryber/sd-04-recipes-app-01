import {
  REQUESTING_CATEGORIES_DRINK,
  REQUEST_CATEGORIES_DRINK_SUCCESS,
  REQUEST_CATEGORIES_DRINK_ERROR,
} from '../Actions/index';

const INITIAL_STATE = {
  isLoading: false,
  categoriesDrinks: {},
  categoriesDrinksError: '',
};

function categoriesDrinkRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUESTING_CATEGORIES_DRINK:
      return { ...state, isLoading: true };
    case REQUEST_CATEGORIES_DRINK_SUCCESS:
      return { ...state, categoriesDrinks: action.data, isLoading: false };
    case REQUEST_CATEGORIES_DRINK_ERROR:
      return { ...state, categoriesDrinksError: action.error, isLoading: false };
    default:
      return state;
  }
}

export default categoriesDrinkRequestReducer;

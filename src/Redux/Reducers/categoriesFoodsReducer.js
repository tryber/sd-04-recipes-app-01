import {
  REQUESTING_CATEGORIES_DRINK,
  REQUEST_CATEGORIES_DRINK_SUCCESS,
  REQUEST_CATEGORIES_DRINK_ERROR,
} from '../Actions/index';

const INITIAL_STATE = {
  isLoading: false,
  categoriesFoods: {},
  categoriesFoodsError: '',
};

function categoriesFoodRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUESTING_CATEGORIES_DRINK:
      return { ...state, isLoading: true };
    case REQUEST_CATEGORIES_DRINK_SUCCESS:
      return { ...state, categoriesFoods: action.data, isLoading: false };
    case REQUEST_CATEGORIES_DRINK_ERROR:
      return { ...state, categoriesFoodsError: action.error, isLoading: false };
    default:
      return state;
  }
}

export default categoriesFoodRequestReducer;

import {
  REQUESTING_DETAILS_DRINK,
  REQUEST_DETAILS_DRINK_SUCCESS,
  REQUEST_DETAILS_DRINK_ERROR,
} from '../Actions/index';

const INITIAL_STATE = {
  isLoading: true,
  detailsDrinks: {},
  detailsDrinksError: '',
};

function detailsDrinkRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUESTING_DETAILS_DRINK:
      return { ...state, isLoading: true };
    case REQUEST_DETAILS_DRINK_SUCCESS:
      return { ...state, detailsDrinks: action.data, isLoading: false };
    case REQUEST_DETAILS_DRINK_ERROR:
      return { ...state, detailsDrinksError: action.error, isLoading: false };
    default:
      return state;
  }
}

export default detailsDrinkRequestReducer;

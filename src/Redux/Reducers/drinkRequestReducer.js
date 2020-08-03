import { REQUESTING_DRINK, REQUEST_DRINK_SUCCESS, REQUEST_DRINK_ERROR } from '../Actions/index';

const INITIAL_STATE = {
  isLoading: false,
  drinks: [],
  drinksError: '',
};

function drinkRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUESTING_DRINK:
      return { ...state, isLoading: true };
    case REQUEST_DRINK_SUCCESS:
      return { ...state, drinks: action.data, isLoading: false };
    case REQUEST_DRINK_ERROR:
      return { ...state, drinksError: action.error, isLoading: false };
    default:
      return state;
  }
}

export default drinkRequestReducer;

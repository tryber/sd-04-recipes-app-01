import { REQUESTING_FOOD, REQUEST_FOOD_SUCCESS, REQUEST_FOOD_ERROR } from '../Actions/index';

const INITIAL_STATE = {
  isLoading: false,
  foods: [],
  foodsError: '',
};

function foodRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUESTING_FOOD:
      return { ...state, isLoading: true };
    case REQUEST_FOOD_SUCCESS:
      return { ...state, foods: action.data, isLoading: false };
    case REQUEST_FOOD_ERROR:
      return { ...state, foodsError: action.error, isLoading: false };
    default:
      return state;
  }
}

export default foodRequestReducer;

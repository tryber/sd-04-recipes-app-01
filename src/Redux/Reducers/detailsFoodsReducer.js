import {
  REQUESTING_DETAILS_FOOD,
  REQUEST_DETAILS_FOOD_SUCCESS,
  REQUEST_DETAILS_FOOD_ERROR,
} from '../Actions/index';

const INITIAL_STATE = {
  isLoading: true,
  detailsFoods: {},
  detailsFoodsError: '',
};

function detailsFoodRequestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUESTING_DETAILS_FOOD:
      return { ...state, isLoading: true };
    case REQUEST_DETAILS_FOOD_SUCCESS:
      return { ...state, detailsFoods: action.data, isLoading: false };
    case REQUEST_DETAILS_FOOD_ERROR:
      return { ...state, detailsFoodsError: action.error, isLoading: false };
    default:
      return state;
  }
}

export default detailsFoodRequestReducer;

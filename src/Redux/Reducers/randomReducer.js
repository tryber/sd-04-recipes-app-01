import {
    REQUEST_RANDOM_SUCCESS, 
    REQUEST_RANDOM_ERROR,
} from '../Actions/index';

const INITIAL_STATE = {
    randomID: ''
}
function randomReducer(state = INITIAL_STATE, action) {
    console.log(action);
    switch (action.type) {
      case  REQUEST_RANDOM_SUCCESS:
        return { randomID: action.data };
      case REQUEST_RANDOM_ERROR:
        return { randomID: action.error };
      default:
        return state;
    }
  }
  
  export default randomReducer;
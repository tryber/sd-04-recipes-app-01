import { REQUEST_API, CHANGE_INPUT, REDIRECT } from '../Actions/index';

const INITIAL_STATE = {
  isFetching: true,
  email: '',
  password: '',
  shouldRedirect: false,
};

function reducerList(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_API:
      return { ...state, isFetching: true };
    case CHANGE_INPUT:
      return { ...state, [action.name]: action.value };
    case REDIRECT:
      return { ...state, shouldRedirect: true };
    default:
      return { ...state };
  }
}

export default reducerList;

import { CHANGE_INPUT, REDIRECT } from '../Actions/index';

const INITIAL_STATE = {
  email: '',
  password: '',
  shouldRedirect: false,
};

function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return { ...state, [action.name]: action.value };
    case REDIRECT:
      return { ...state, shouldRedirect: true };
    default:
      return state;
  }
}

export default loginReducer;

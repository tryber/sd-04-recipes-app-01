import { SHOW_SEARCH_BAR } from '../Actions/index';

const INITIAL_STATE = {
  showSearchBar: false,
};

function headerAndFooterReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_SEARCH_BAR:
      return { ...state, showSearchBar: !state.showSearchBar };
    default:
      return state;
  }
}

export default headerAndFooterReducer;

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';

import rootReducer from '../Redux/Reducers';

export default function renderWithRedux(
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
}

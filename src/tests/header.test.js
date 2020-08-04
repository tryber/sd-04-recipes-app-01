import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import testData from '../../cypress/mocks/areas';
import App from '../App';
import reducer from '';


console.log(testData);
const getStore = (initialState) => {
  if (!initialState) return createStore(reducer, applyMiddleware(thunk));
  return createStore(reducer, initialState, applyMiddleware(thunk));
};

const renderApp = (initialState) => {
  const store = getStore(initialState);

  return {
    ...render(
      <Provider store={store}>
        <App />
      </Provider>,
    ),
    store,
  };
};

test('', () => {
  expect(testData).toBe(0)
})
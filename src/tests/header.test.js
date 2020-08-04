import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import testData from '../../cypress/mocks/areas';
import testData2 from '../../cypress/mocks/areas';

import App from '../App';
import reducer from '';


const getStore = (initialState) => {
  if (!initialState) return createStore(reducer, applyMiddleware(thunk));
  return createStore(reducer, initialState, applyMiddleware(thunk));
};

const mockFetchRecepies = () => {
  const apiResponse = Promise.resolve({
    json: () => Promise.resolve(testData),
    ok: true,
  });
  global.fetch = jest.fn(() => apiResponse);
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
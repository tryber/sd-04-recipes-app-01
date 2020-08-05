import React from 'react';
import { cleanup, act, screen } from '@testing-library/react';

import renderWithReduxAndRouter from './renderWithReduxAndRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

const services = require('../services/food');

const mockGetFood = jest.spyOn(services, 'getFood').mockImplementation((filter = '') => {
  const firstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
  const nameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const ingredientesURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  const principalRecipesURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const filterCategoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  let link = filterCategoryURL;
  if (filter === '') link = principalRecipesURL;
  if (filter === 'Ingrediente') link = ingredientesURL;
  if (filter === 'Nome') link = nameURL;
  if (filter === 'Primeira letra') link = firstLetterURL;
  return fetch(link).then((data) => data.json()).then((data) => data.meals);
});
describe('test', () => {
  beforeAll(mockGetFood);
  beforeEach(cleanup);
  test('test', async () => {
    // mockGetFood().then(data => data.json()).then(data => console.log(data))
    await act(async () => {
      renderWithReduxAndRouter(<App />, {
        initialState: { loginReducer: { email: '', password: '', shouldRedirect: false } },
        initialEntries: ['/comidas'],
      });
    });
    // const test =  getByTestId('test');
    // await waitForElementToBeRemoved()
    // await waitForElementToBeRemoved(() => queryByText('loading'));
    expect(services.getFood).toHaveBeenCalled();
    const test = await screen.findByTestId('profile-top-btn');
    expect(test).toBeInTheDocument();
  });
});

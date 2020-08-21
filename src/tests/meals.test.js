import React from 'react';
import { cleanup, act, screen, fireEvent } from '@testing-library/react';

import renderWithReduxAndRouter from './renderWithReduxAndRouter';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';

const services = require('../services/food');

const mockGetFood = jest.spyOn(services, 'getFood').mockImplementation((filter = '', food) => {
  const firstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
  const nameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const ingredientesURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  const principalRecipesURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const filterCategoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  let link = `${filterCategoryURL}${filter}`;
  if (filter === '') link = principalRecipesURL;
  if (filter === 'Ingrediente') link = `${ingredientesURL}${food}`;
  if (filter === 'Nome') link = `${nameURL}${food}`;
  if (filter === 'Primeira letra') link = `${firstLetterURL}${food}`;
  return fetch(link).then((data) => data.json()).then((data) => data.meals);
});

const mockGetCategoriesFood = jest.spyOn(services, 'getCategoriesFood').mockImplementation(() => {
  const categoriesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  return fetch(categoriesURL).then((data) => data.json()).then((data) => data.meals);
});

describe('test', () => {
  beforeAll(mockGetFood, mockGetCategoriesFood);
  beforeEach(cleanup);
  test('test', async () => {
    // mockGetFood().then(data => data.json()).then(data => console.log(data))
    await act(async () => {
      renderWithReduxAndRouter(<App />, {
        initialState: {},
        initialEntries: ['/comidas'],
      });
    });

    expect(services.getFood).toHaveBeenCalled();
    expect(services.getCategoriesFood).toHaveBeenCalled();
    const profileBtn = await screen.findByTestId('profile-top-btn');
    const beefBtn = await screen.findByTestId('Beef-category-filter');
    const element = await screen.findByTestId('0-recipe-card');
    const elementName = await screen.findByTestId('0-card-name');
    expect(profileBtn).toBeInTheDocument();
    expect(beefBtn).toBeInTheDocument();
    expect(element).toBeInTheDocument();
    expect(elementName.textContent).toBe('Corba');

    await act(async () => {
      fireEvent.click(beefBtn);
    });
    const element1 = await screen.findByTestId('0-recipe-card');
    expect(profileBtn).toBeInTheDocument();
    expect(element).not.toBeInTheDocument();
    expect(elementName).not.toBeInTheDocument();
    expect(element1).toBeInTheDocument();
    expect(element1.textContent).toBe('Beef and Mustard Pie');
  });
});

describe('header of meals page', () => {
  beforeAll(mockGetFood, mockGetCategoriesFood);
  beforeEach(cleanup);

  test('header shold have all its elements', async () => {
    // await act(async () => {
    const { getByText, getByTestId, history } = renderWithReduxAndRouter(<App />, {
      initialState: {},
      initialEntries: ['/comidas'],
    });
    // });
    const load = getByText('Loading...');
    await act(async () => {
      expect(load).toBeInTheDocument();
      expect(services.getFood).toHaveBeenCalled();
      expect(services.getCategoriesFood).toHaveBeenCalled();
    });
    console.log(history.location.pathname);
    const test = getByTestId('profile-top-btn');
    const profileBtn = await screen.findByTestId('profile-top-btn');
    const pageTitle = await screen.findByTestId('page-title');
    const searchBtn = await screen.findByTestId('search-top-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Comidas');
    expect(searchBtn).toBeInTheDocument();

    fireEvent.click(profileBtn);
    expect(profileBtn).not.toBeInTheDocument();
    console.log(history.location.pathname);

  });
});

import React from 'react';
import { cleanup, act, screen, fireEvent } from '@testing-library/react';

import renderWithReduxAndRouter from './renderWithReduxAndRouter';
import fetch from '../../cypress/mocks/fetch';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import meals from '../../cypress/mocks/meals';

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
  console.log('fui chamado com', filter, food);
  return fetch(link)
    .then((data) => data.json())
    .then((data) => data.meals);
});

const mockGetCategoriesFood = jest.spyOn(services, 'getCategoriesFood').mockImplementation(() => {
  const categoriesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  return fetch(categoriesURL)
    .then((data) => data.json())
    .then((data) => data.meals);
});

const getSearchbarBtns = async () => {
  const inputBar = await screen.findByTestId('search-input');
  const ingredientRadioLabel = await screen.findByTestId('ingredient-search-radio');
  const nomeRadio = await screen.findByTestId('name-search-radio');
  const primeiraLetraRadio = await screen.findByTestId('first-letter-search-radio');
  const applyFilterBtn = await screen.findByTestId('exec-search-btn');
  return {
    inputBar, ingredientRadioLabel, nomeRadio, primeiraLetraRadio, applyFilterBtn,
  };
};

describe('header of meals page', () => {
  beforeAll(mockGetFood, mockGetCategoriesFood);
  // before all executa mockGetFood?? ou seja o primeiro parametro
  beforeEach(cleanup);

  test('header should have all its elements', async () => {
    await act(async () => {
      renderWithReduxAndRouter(<App />, {
        initialState: {},
        initialEntries: ['/comidas'],
      });
    });
    const profileBtn = await screen.findByTestId('profile-top-btn');
    const pageTitle = await screen.findByTestId('page-title');
    const searchBtn = await screen.findByTestId('search-top-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle.textContent).toBe('Comidas');
    expect(searchBtn).toBeInTheDocument();
  });

  test('profile button should go to profile page', async () => {
    const { history } = renderWithReduxAndRouter(<App />, {
      initialState: {},
      initialEntries: ['/comidas'],
    });
    await act(async () => {
      expect(services.getFood).toHaveBeenCalledTimes(3);
      expect(services.getCategoriesFood).toHaveBeenCalledTimes(2);
    });
    const profileBtn = await screen.findByTestId('profile-top-btn');

    expect(profileBtn).toBeInTheDocument();
    fireEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/perfil');
    expect(profileBtn).not.toBeInTheDocument();
  });

  test('when the search icon is clicked the filter option should appear', async () => {
    await act(async () => {
      renderWithReduxAndRouter(<App />, {
        initialState: {},
        initialEntries: ['/comidas'],
      });
    });
    const searchBtn = await screen.findByTestId('search-top-btn');

    expect(searchBtn).toBeInTheDocument();

    fireEvent.click(searchBtn);
    const {
      inputBar, ingredientRadioLabel, nomeRadio, primeiraLetraRadio, applyFilterBtn,
    } = await getSearchbarBtns();
    expect(inputBar).toBeInTheDocument();
    expect(ingredientRadioLabel).toBeInTheDocument();
    expect(nomeRadio).toBeInTheDocument();
    expect(primeiraLetraRadio).toBeInTheDocument();
    expect(applyFilterBtn).toBeInTheDocument();
  });
});

describe('Render cards of meals page', () => {
  beforeAll(mockGetFood, mockGetCategoriesFood);
  beforeEach(cleanup);

  test('should render the 12 first meals', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, {
      initialState: {},
      initialEntries: ['/comidas'],
    });

    await act(async () => {
      expect(mockGetFood).toHaveBeenCalled();
    });

    for (let index = 0; index < 12; index += 1) {
      const cardDiv = getByTestId(`${index}-recipe-card`);
      const cardImg = getByTestId(`${index}-card-img`);
      const cardName = getByTestId(`${index}-card-name`);

      expect(cardDiv).toBeInTheDocument();
      expect(cardDiv.parentElement.href).toBe(`http://localhost/comidas/${meals.meals[index].idMeal}`);
      expect(cardImg.src).toBe(meals.meals[index].strMealThumb);
      expect(cardImg.alt).toBe(meals.meals[index].strMeal);
      expect(cardName.textContent).toBe(meals.meals[index].strMeal);
    }
  });
});

describe('searchbar of meals page', () => {
  beforeAll(mockGetFood, mockGetCategoriesFood);
  beforeEach(cleanup);

  test('should filter meals by ingredient', async () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, {
      initialState: {},
      initialEntries: ['/comidas'],
    });
    const searchBtn = await screen.findByTestId('search-top-btn');

    expect(searchBtn).toBeInTheDocument();

    fireEvent.click(searchBtn);

    const { inputBar, ingredientRadioLabel, applyFilterBtn } = await getSearchbarBtns();
    const firstFood = await screen.findByTestId('0-recipe-card');

    expect(firstFood).toBeInTheDocument();

    fireEvent.change(inputBar, { target: { value: 'Chicken' } });
    fireEvent.click(ingredientRadioLabel);
    fireEvent.click(applyFilterBtn);
    await act(async () => {
      expect(mockGetFood).toHaveBeenCalledWith('Ingrediente', 'Chicken');
    });

    expect(firstFood).not.toBeInTheDocument();

    mealsByIngredient.meals.forEach((food, index) => {
      const cardDiv = getByTestId(`${index}-recipe-card`);
      const cardImg = getByTestId(`${index}-card-img`);
      const cardName = getByTestId(`${index}-card-name`);

      expect(cardDiv).toBeInTheDocument();
      expect(cardDiv.parentElement.href).toBe(`http://localhost/comidas/${food.idMeal}`);
      expect(cardImg.src).toBe(food.strMealThumb);
      expect(cardImg.alt).toBe(food.strMeal);
      expect(cardName.textContent).toBe(food.strMeal);
    });
  });
});

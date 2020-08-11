const firstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const nameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ingredientesURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const principalRecipesURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const filterCategoryURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const filterCategoryAreaURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

export const getFood = (filter = '', food) => {
  let link = `${filterCategoryURL}${filter}`;
  if (food === '/explorar/comidas/area') link = `${filterCategoryAreaURL}${filter}`;
  if (filter === '') link = principalRecipesURL;
  if (filter === 'Ingrediente') link = `${ingredientesURL}${food}`;
  if (filter === 'Nome') link = `${nameURL}${food}`;
  if (filter === 'Primeira letra') link = `${firstLetterURL}${food}`;
  return fetch(`${link}`).then((response) =>
    response
      .json()
      .then((json) => (response.ok ? Promise.resolve(json.meals) : Promise.reject(json))),
  );
};

const categoriesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const categoriesAreaURL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const listIngredientesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const getCategoriesFood = (type) => {
  let link = categoriesURL;
  if (type === 'ingredient') link = listIngredientesURL;
  if (type === 'area') link = categoriesAreaURL;
  return fetch(`${link}`).then((response) =>
    response
      .json()
      .then((json) => (response.ok ? Promise.resolve(json.meals) : Promise.reject(json))),
  );
};

const detailsURL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

export const getDetailsFood = (id) =>
  fetch(`${detailsURL}${id}`).then((response) =>
    response.json().then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))),
  );

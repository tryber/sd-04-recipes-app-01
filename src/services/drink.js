const firstLetterURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
const nameURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const ingredientesURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const principalRecipesURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const filterCategoryURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const getDrink = (filter = '', drink) => {
  let link = `${filterCategoryURL}${filter}`;
  if (filter === '') link = principalRecipesURL;
  if (filter === 'Ingrediente') link = `${ingredientesURL}${drink}`;
  if (filter === 'Nome') link = `${nameURL}${drink}`;
  if (filter === 'Primeira letra') link = `${firstLetterURL}${drink}`;
  return fetch(`${link}`).then((response) =>
    response
      .json()
      .then((json) => (response.ok ? Promise.resolve(json.drinks) : Promise.reject(json))),
  );
};

const categoriesURL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const getCategoriesDrink = () => (
  fetch(`${categoriesURL}`).then((response) =>
    response
      .json()
      .then((json) => (response.ok ? Promise.resolve(json.drinks) : Promise.reject(json))),
  )
);

const detailsURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const getDetailsDrink = (id) => (
  fetch(`${detailsURL}${id}`).then((response) =>
    response
      .json()
      .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json))),
  )
);

const firstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const nameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ingredientesURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const principalRecipesURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const getFood = (filter, food) => {
  let link = '';
  if (!filter) link = principalRecipesURL;
  if (filter === 'Ingrediente') link = `${ingredientesURL}${food}`;
  if (filter === 'Nome') link = `${nameURL}${food}`;
  if (filter === 'Primeira letra') link = `${firstLetterURL}${food}`;
  return fetch(`${link}`)
    .then((response) =>
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json.meals) : Promise.reject(json))),
    );
};

export default getFood;

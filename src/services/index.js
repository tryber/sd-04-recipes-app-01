const firstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const nameURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const ingredientesURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const principalRecipesURL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const getFood = (filter, food) => {
  let link = '';
  if (!filter) link = principalRecipesURL;
  if (filter === 'Ingrediente') link = ingredientesURL;
  if (filter === 'Nome') link = nameURL;
  if (filter === 'Primeira letra') link = firstLetterURL;
  fetch(`${link}${food}`)
    .then((response) =>
      response
        .json()
        .then((json) => json.meals),
    );
};

export default getFood;

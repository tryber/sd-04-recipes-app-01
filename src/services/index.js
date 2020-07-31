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
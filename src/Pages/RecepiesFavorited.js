import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import FilterTopBtns from '../Components/FilterTopBtns';
import { getLocalStorage, convertObjKeys, filterCards } from '../helpers';
import IconsFood from '../Components/Icons';

const RecepiesFavorited = ({ location: { pathname } }) => {
  const [favoriteRecipes, setFavoriteRecipes] = useState(getLocalStorage('favoriteRecipes'));
  const [filter, setFilter] = useState('All');
  const createPathObj = (type, id) => ({ path: `/${type}s/:id`, url: `/${type}s/${id}` });
  const filterRecipes = ({ target: { name } }) => {
    setFilter(name);
    filterCards(getLocalStorage('favoriteRecipes'), name, setFavoriteRecipes, 'favoriteRecipes');
  };
  const unfavorite = () => {
    setFavoriteRecipes(getLocalStorage('favoriteRecipes'));
    filterRecipes({ target: { name: filter } });
  };
  return (
    <div>
      <Header pathname={pathname} />
      <FilterTopBtns filterRecipes={filterRecipes} />
      {favoriteRecipes.map((recipe, i) => (
        <div>
          <Link to={`/${recipe.type}s/${recipe.id}`}>
            <img width="200" key={recipe.image} data-testid={`${i}-horizontal-image`} src={recipe.image} alt="recipe" />
          </Link>
          <p data-testid={`${i}-horizontal-top-text`}>{(recipe.type === 'comida') ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}</p>
          <Link to={`/${recipe.type}s/${recipe.id}`}>
            <h1 data-testid={`${i}-horizontal-name`}>{recipe.name}</h1>
          </Link>
          <button type="button" onClick={() => unfavorite()}>
            <IconsFood
              pathName={createPathObj(recipe.type, recipe.id)}
              i={i}
              detailsRecipe={convertObjKeys(recipe)}
              detailsDrink={convertObjKeys(recipe)}
              PathDoneFavorite={pathname}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

RecepiesFavorited.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default RecepiesFavorited;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import FilterTopBtns from '../Components/FilterTopBtns';
import { getLocalStorage, convertObjKeys, filterCards } from '../helpers';
import IconsFood from '../Components/Icons';
import StandardCard from '../Components/StandardCard';

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
      {favoriteRecipes.map((recipe, index) => (
        <div>
          <StandardCard recipe={recipe} i={index} />
          <button type="button" onClick={() => unfavorite()}>
            <IconsFood
              pathName={createPathObj(recipe.type, recipe.id)}
              i={index}
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

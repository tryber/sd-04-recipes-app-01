import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import FilterTopBtns from '../Components/FilterTopBtns';
import { getLocalStorage, convertObjKeys, filterCards } from '../helpers';
import IconsFood from '../Components/Icons';
import StandardCard from '../Components/StandardCard';

const RecepiesDone = ({ location: { pathname } }) => {
  const [doneRecipes, setDoneRecipes] = useState(getLocalStorage('doneRecipes'));
  const createPathObj = (type, id) => ({ path: `/${type}s/:id`, url: `/${type}s/${id}` });
  const filterRecipes = ({ target: { name } }) => {
    filterCards(getLocalStorage('doneRecipes'), name, setDoneRecipes, 'doneRecipes');
  };
  return (
    <div>
      <Header pathname={pathname} />
      <FilterTopBtns filterRecipes={filterRecipes} />
      {doneRecipes.map((recipe, i) => (
        <div>
          <StandardCard recipe={recipe} i={i} />
          <p data-testid={`${i}-horizontal-done-date`}>{`Feita em: ${recipe.doneDate}`}</p>
          <IconsFood
            pathName={createPathObj(recipe.type, recipe.id)}
            i={i}
            detailsRecipe={convertObjKeys(recipe)}
            detailsDrink={convertObjKeys(recipe)}
            PathDoneFavorite={pathname}
          />
          {recipe.tags.map((tag) => <span data-testid={`${i}-${tag}-horizontal-tag`}>{tag}</span>)}
        </div>
      ))}
    </div>
  );
};

RecepiesDone.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default RecepiesDone;

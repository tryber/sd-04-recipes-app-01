import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import save from '../helpers/index';
import { getLocalStorage } from '../helpers/index';

const copy = require('clipboard-copy');

const InputHeart = (heart, callback) => {
  if (callback) {
    return (
      <input
        type="image"
        src={heart}
        alt="s2"
        data-testid="favorite-btn"
        onClick={() => callback()}
      />
    );
  }
  return <input type="image" alt="s2" src={heart} data-testid="favorite-btn" />;
};

const InputShare = (strSource, callback) => {
  const handleShare = () => {
    callback(true);
    copy(`http://localhost:3000${strSource}`);
  };
  return (
    <div>
      <input
        type="image"
        alt="shareIcon"
        src={shareIcon}
        data-testid="share-btn"
        onClick={() => handleShare()}
      />
    </div>
  );
};

const Comparisor = (idMeal) =>
  getLocalStorage('favoriteRecipes').find(({ id }) => id === idMeal);

const foodData = (strMeal, strMealThumb, strCategory, idMeal, strArea) => ({
  id: idMeal,
  type: 'comida',
  area: strArea,
  category: strCategory,
  alcoholicOrNot: '',
  name: strMeal,
  image: strMealThumb,
});

const drinkData = (
  strDrink,
  strDrinkThumb,
  strCategory,
  strAlcoholic,
  idDrink,
) => ({
  id: idDrink,
  type: 'bebida',
  area: '',
  category: strCategory,
  alcoholicOrNot: strAlcoholic,
  name: strDrink,
  image: strDrinkThumb,
});

const verifyingRoute = (props, path) => {
  if (path === '/comidas/:id' || path === '/comidas/:id/in-progress') {
    const {
      detailsRecipe: { strMeal, strMealThumb, strCategory, idMeal, strArea },
    } = props;
    return foodData(strMeal, strMealThumb, strCategory, idMeal, strArea);
  }
  const {
    detailsDrink: { strDrink, strDrinkThumb, strCategory, strAlcoholic, idDrink } } = props;
  return drinkData(strDrink, strDrinkThumb, strCategory, strAlcoholic, idDrink);
}

const IconsFood = (props) => {
  const [copied, setCopied] = useState(false);
  const [render, setRender] = useState(false);
  const {
    pathName: { path, url },
  } = props;
  const actualData = verifyingRoute(props, path);
  const infoFromLocalStorage = getLocalStorage('favoriteRecipes');
  const onFavorite = () => {
    const setToLocalStore = [...infoFromLocalStorage, actualData];
    save('favoriteRecipes', setToLocalStore);
    setRender(!render);
  };
  const unFavorite = () => {
    const local = getLocalStorage('favoriteRecipes');
    const newLocal = [];
    local.forEach((recipe) => {
      if (!recipe.id.includes(actualData.id)) {
        newLocal.push(recipe);
      }
    });
    save('favoriteRecipes', newLocal);
    setRender(!render);
  };
  return (
    <div>
      <div>
        {Comparisor(actualData.id)
          ? InputHeart(blackHeart, unFavorite)
          : InputHeart(whiteHeart, onFavorite)}
      </div>
      {InputShare(url, setCopied)}
      {copied && <p>Link copiado!</p>}
    </div>
  );
};

IconsFood.propTypes = {
  detailsDrink: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    idDrink: PropTypes.string,
  }),
  detailsRecipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
    strCategory: PropTypes.string,
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
  }),
  pathName: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

IconsFood.defaultProps = {
  detailsDrink: {},
  detailsRecipe: {},
};

export default IconsFood;

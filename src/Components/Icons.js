import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import save from '../helpers/index';
import { getLocalStorage } from '../helpers/index';

const InputHeart = (heart, callback) => {
  if (callback) {
    return (
      <input
        type="image"
        src={heart}
        data-testid="favorite-btn"
        onClick={() => callback()}
      />
    );
  }
  return <input type="image" src={heart} data-testid="favorite-btn" />;
};

const InputShare = (strSource, callback) => (
  <div>
    <CopyToClipboard text={strSource}>
      <input
        type="image"
        src={shareIcon}
        data-testid="share-btn"
        onClick={() => callback(true)}
      />
    </CopyToClipboard>
  </div>
);


const Comparisor = (idMeal) => (
  getLocalStorage('favoriteRecipes').find(({ id }) => id === idMeal)
);


const Icons = (props) => {
  const [copied, setCopied] = useState(false);
  const [render, setRender] = useState(false);
  const {
    detailsRecipe: { strMeal, strMealThumb, strCategory, strSource, idMeal, strArea },
  } = props;
  const infoFromLocalStorage = getLocalStorage('favoriteRecipes');
  const actualData = {
    id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };
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
        {Comparisor(idMeal)
          ? InputHeart(blackHeart, unFavorite)
          : InputHeart(whiteHeart, onFavorite)}
      </div>
      {InputShare(strSource, setCopied)}
      {copied && <p>Link copiado!</p>}
    </div>
  );
};

Icons.propTypes = {
  detailsRecipe: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  detailsRecipe: state.detailsFoodsReducer.detailsFoods[0],
});

export default connect(mapStateToProps)(Icons);

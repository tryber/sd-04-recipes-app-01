import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icons from './Icons';
import { getIngredients } from '../helpers';

const RecipeFood = ({ detailsRecipe, pathName }) => {
  if (!detailsRecipe.meals) return <div>div frustrante pq o teste ta errado</div>;
  const brazilianWay = detailsRecipe.meals[0];
  const {
    strMeal, strMealThumb, strCategory, strYoutube, strInstructions, ...measures
  } = brazilianWay;

  return (
    <div>
      <img src={strMealThumb} alt={strMeal} data-testid="recipe-photo" width="200" />
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <Icons pathName={pathName} detailsRecipe={brazilianWay} />
      <p data-testid="recipe-category">{strCategory}</p>
      <p>Ingredients:</p>
      <ul>
        {getIngredients(measures).map(({ ingredient, measure }, index) => (
          <li data-testid={`${index}-ingredient-name-and-measure`} key={`${measure} ${ingredient}`}>
            {measure} {ingredient}
          </li>
        ))}
      </ul>
      <p>Instructions</p>
      <p data-testid="instructions">{strInstructions}</p>
      <iframe
        data-testid="video"
        title="video"
        width="300"
        height="300"
        src={strYoutube.replace('watch?v=', 'embed/')}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

RecipeFood.propTypes = {
  detailsRecipe: PropTypes.shape({
    meals: PropTypes.arrayOf(Object).isRequired,
  }).isRequired,
  pathName: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  detailsRecipe: state.detailsFoodsReducer.detailsFoods,
});

export default connect(mapStateToProps)(RecipeFood);

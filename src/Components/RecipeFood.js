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
    <div className="d-flex flex-column align-items-center recipe-food-margin">
      <div className="card text-white bg-dark card-meals">
        <img className="card-img-top" src={strMealThumb} alt={strMeal} data-testid="recipe-photo" />
        <div className="card-body d-flex flex-row justify-content-between">
          <h2 className="card-text" data-testid="recipe-title">{strMeal}</h2>
          <Icons pathName={pathName} detailsRecipe={brazilianWay} />
        </div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center instructions">
        <h3 data-testid="recipe-category">
          Category:
          {' '}
          {strCategory}
        </h3>
        <h2>Ingredients:</h2>
        <div className="w-100">
          <ul>
            {getIngredients(measures).map(({ ingredient, measure }, index) => (
              <li data-testid={`${index}-ingredient-name-and-measure`} key={`${measure} ${ingredient}`}>
                {measure}
                {' '}
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <h3>Instructions</h3>
        <p data-testid="instructions" className="text-wrap text-break w-100">{strInstructions}</p>
      </div>
      <br />
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

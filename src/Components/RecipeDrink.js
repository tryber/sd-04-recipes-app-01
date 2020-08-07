import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icons from './Icons';
import { getIngredients } from '../helpers';

const RecipeDrink = ({ detailsRecipe, pathName }) => {
  if (!detailsRecipe.drinks) return <div>div frustrante pq o teste ta errado</div>;
  const brazilianWay = detailsRecipe.drinks[0];
  const {
    strDrink, strDrinkThumb, strAlcoholic, strInstructions, ...measures
  } = brazilianWay;

  return (
    <div>
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <img src={strDrinkThumb} alt={strDrink} data-testid="recipe-photo" width="200" />
      <Icons pathName={pathName} detailsDrink={brazilianWay} />
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <p>Ingredients:</p>
      <ul data-testid="0-ingredient-name-and-measure">
        {getIngredients(measures).map(({ ingredient, measure }, index) => (
          <li data-testid={`${index}-ingredient-name-and-measure`} key={ingredient}>
            {measure} {ingredient}
          </li>
        ))}
      </ul>
      <p>Instructions</p>
      <p data-testid="instructions">{strInstructions}</p>
    </div>
  );
};

RecipeDrink.propTypes = {
  detailsRecipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
  pathName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  detailsRecipe: state.detailsDrinksReducer.detailsDrinks,
});

export default connect(mapStateToProps)(RecipeDrink);

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getIngredients } from '../helpers';

const RecipeDrink = (props) => {
  const {
    detailsRecipe: { strDrink, strDrinkThumb, strAlcoholic, strInstructions, ...measures },
  } = props;

  return (
    <div>
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <img src={strDrinkThumb} alt={strDrink} data-testid="recipe-photo" width="200" />
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
};

const mapStateToProps = (state) => ({
  detailsRecipe: state.detailsDrinksReducer.detailsDrinks[0],
});

export default connect(mapStateToProps)(RecipeDrink);

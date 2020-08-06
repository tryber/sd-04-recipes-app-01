import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icons from './Icons';

const RecipeDrink = (props) => {
  const { detailsRecipe: { strDrink, strDrinkThumb, strAlcoholic }, pathName } = props;

  return (
    <div>
      <h2 data-testid="recipe-title">{strDrink}</h2>
      <img
        src={strDrinkThumb}
        alt={strDrink}
        data-testid="recipe-photo"
        width="200"
      />
      <p data-testid="recipe-category">{strAlcoholic}</p>
      <Icons pathName={pathName} />
    </div>
  );
};

RecipeDrink.propTypes = {
  detailsRecipe: PropTypes.shape({
    strDrink: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  pathName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  detailsRecipe: state.detailsDrinksReducer.detailsDrinks[0],
});

export default connect(mapStateToProps)(RecipeDrink);

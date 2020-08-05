import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const RecipeFood = (props) => {
  const { detailsRecipe: { strMeal, strMealThumb, strCategory } } = props;
  return (
    <div>
      <h2 data-testid="recipe-title">{strMeal}</h2>
      <img
        src={strMealThumb}
        alt={strMeal}
        data-testid="recipe-photo"
        width="200"
      />
      <p data-testid="recipe-category">{strCategory}</p>
    </div>
  );
};

RecipeFood.propTypes = {
  detailsRecipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  detailsRecipe: state.detailsFoodsReducer.detailsFoods[0],
});

export default connect(mapStateToProps)(RecipeFood);

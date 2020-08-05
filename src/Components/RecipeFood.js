import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const RecipeFood = ({ detailsRecipe }) => {
  return (
    <div>
      <h2 data-testid="recipe-title">{detailsRecipe.strMeal}</h2>
      <img
        src={detailsRecipe.strMealThumb}
        alt={detailsRecipe.strMeal}
        data-testid="recipe-photo"
        width="200"
      />
      <p>{detailsRecipe.strCategory}</p>
    </div>
  );
};

RecipeFood.propTypes = {
  detailsRecipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  detailsRecipe: state.detailsFoodsReducer.detailsFoods[0],
});

export default connect(mapStateToProps)(RecipeFood);

import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icons from './Icons';

const RecipeFood = (props) => {
  const { detailsRecipe: { strMeal, strMealThumb, strCategory }, pathName } = props;
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
      <Icons pathName={pathName} />
    </div>
  );
};

RecipeFood.propTypes = {
  detailsRecipe: PropTypes.shape({
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  pathName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  detailsRecipe: state.detailsFoodsReducer.detailsFoods[0],
});

export default connect(mapStateToProps)(RecipeFood);

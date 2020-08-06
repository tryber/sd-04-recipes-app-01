import PropTypes, { element } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Icons from './Icons';

const RecipeFood = (props) => {
  const { detailsRecipe: { strMeal, strMealThumb, strCategory, ...measures } } = props;
  // console.log(measures)
  // const xablau = (Object.keys(measures));
  // const valores = xablau.map(element => measures[element])
  // console.log(valores)
  // console.log(xablau.filter(element => element.startsWith('strIngredient')).map(element => measures[element]))
  // console.log(xablau.filter(element => element.startsWith('strMeasure')))
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
      <Icons />
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

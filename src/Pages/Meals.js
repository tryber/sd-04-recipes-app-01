import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardsFood from '../Components/CardsFood';
import { getFoods, getCategoriesFoods } from '../Redux/Actions/index';
import CategoriesFood from '../Components/CategoriesFood';

const Meals = ({ isLoadingFood, isLoadingCategory, cardsRequisition, categoriesRequisition }) => {
  useEffect(() => {
    cardsRequisition();
    categoriesRequisition();
  }, []);

  if (isLoadingFood || isLoadingCategory) return <h2>Loading...</h2>;
  return (
    <div>
      <CategoriesFood />
      <h1>Meals</h1>
      <CardsFood />
    </div>
  );
};

Meals.propTypes = {
  cardsRequisition: PropTypes.func.isRequired,
  categoriesRequisition: PropTypes.func,
  isLoadingCategory: PropTypes.bool,
  isLoadingFood: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoadingFood: state.foodRequestReducer.isLoading,
  isLoadingCategory: state.categoriesFoodsReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: () => dispatch(getFoods()),
  categoriesRequisition: () => dispatch(getCategoriesFoods()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import CardsFood from '../Components/CardsFood';
import { getFoods, getCategoriesFoods } from '../Redux/Actions/index';
import CategoriesFood from '../Components/CategoriesFood';

const Meals = ({
  isLoadingFood,
  isLoadingCategory,
  cardsRequisition,
  categoriesRequisition,
  location: { pathname },
}) => {
  useEffect(() => {
    cardsRequisition();
    categoriesRequisition();
  }, []);

  if (isLoadingFood || isLoadingCategory) return <h2>Loading...</h2>;
  return (
    <div>
      <Header pathname={pathname} />
      <CategoriesFood />
      <h1>Meals</h1>
      <CardsFood />
    </div>
  );
};

Meals.propTypes = {
  cardsRequisition: PropTypes.func.isRequired,
  categoriesRequisition: PropTypes.func.isRequired,
  isLoadingCategory: PropTypes.bool.isRequired,
  isLoadingFood: PropTypes.bool.isRequired,
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
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

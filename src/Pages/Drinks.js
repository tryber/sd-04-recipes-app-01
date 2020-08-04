import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardsDrink from '../Components/CardsDrink';
import { getDrinks, getCategoriesDrinks } from '../Redux/Actions/index';
import CategoriesDrink from '../Components/CategoriesDrink';
import Header from '../Components/Header';

const Drinks = ({
  isLoadingDrink,
  isLoadingCategory,
  cardsRequisition,
  categoriesRequisition,
  location: { pathname },
}) => {
  useEffect(() => {
    cardsRequisition();
    categoriesRequisition();
  }, []);

  if (isLoadingDrink || isLoadingCategory) return <h2>Loading...</h2>;
  return (
    <div>
      <Header pathname={pathname} />
      <CategoriesDrink />
      <h1>Drinks</h1>
      <CardsDrink />
    </div>
  );
};

Drinks.propTypes = {
  cardsRequisition: PropTypes.func.isRequired,
  categoriesRequisition: PropTypes.func.isRequired,
  isLoadingCategory: PropTypes.bool.isRequired,
  isLoadingDrink: PropTypes.bool.isRequired,
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  isLoadingDrink: state.drinkRequestReducer.isLoading,
  isLoadingCategory: state.categoriesDrinksReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: () => dispatch(getDrinks()),
  categoriesRequisition: () => dispatch(getCategoriesDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);

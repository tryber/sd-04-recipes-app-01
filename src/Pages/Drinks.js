import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardsDrink from '../Components/CardsDrink';
import SearchBar from '../Components/SearchBar';
import { getDrinks, getCategoriesDrinks } from '../Redux/Actions/index';
import CategoriesDrink from '../Components/CategoriesDrink';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

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
  }, [cardsRequisition, categoriesRequisition]);

  if (isLoadingDrink || isLoadingCategory) return <h2>Loading...</h2>;
  return (
    <div>
      <Header pathname={pathname} />
      <SearchBar request={cardsRequisition} />
      <CategoriesDrink />
      <CardsDrink request={cardsRequisition} />
      <Footer />
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
  cardsRequisition: (filter, drink) => dispatch(getDrinks(filter, drink)),
  categoriesRequisition: () => dispatch(getCategoriesDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);

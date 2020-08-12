import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Cards from '../Components/Cards';
import SearchBar from '../Components/SearchBar';
import { getDrinks, getCategoriesDrinks } from '../Redux/Actions/index';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Categories from '../Components/Categories';

const Drinks = ({
  isLoadingDrink,
  isLoadingCategory,
  cardsRequisition,
  categoriesRequisition,
  location: { pathname, name },
}) => {
  useEffect(() => {
    if (name) cardsRequisition('Ingrediente', name);
    else cardsRequisition();
    categoriesRequisition();
  }, [cardsRequisition, categoriesRequisition, name]);

  if (isLoadingDrink || isLoadingCategory) return <h2>Loading...</h2>;
  return (
    <div>
      <Header pathname={pathname} />
      <SearchBar request={cardsRequisition} />
      <Categories pathname={pathname} />
      <Cards request={cardsRequisition} pathname={pathname} />
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

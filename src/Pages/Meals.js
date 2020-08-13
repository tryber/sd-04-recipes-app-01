import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../Components/SearchBar';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getFoods, getCategoriesFoods } from '../Redux/Actions/index';
import Cards from '../Components/Cards';
import Categories from '../Components/Categories';
import Phrases from '../Components/Phrases';

const Meals = ({
  isLoadingFood,
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

  if (isLoadingFood && isLoadingCategory) return <Phrases />;

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
  cardsRequisition: (filter, food) => dispatch(getFoods(filter, food)),
  categoriesRequisition: () => dispatch(getCategoriesFoods()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);

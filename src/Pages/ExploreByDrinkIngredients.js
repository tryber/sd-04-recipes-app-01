import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getCategoriesDrinks } from '../Redux/Actions/index';
import CardsIngredients from '../Components/CardsIngredients';
import Phrases from '../Components/Phrases';

const ExploreByDrinkIngredients = ({
  location: { pathname },
  categoriesRequisition,
  isLoadingCategory,
}) => {
  useEffect(() => {
    categoriesRequisition('ingredient');
  }, [categoriesRequisition]);

  if (isLoadingCategory) return <Phrases />;
  return (
    <div>
      <Header pathname={pathname} />
      <CardsIngredients pathname={pathname} />
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoadingCategory: state.categoriesDrinksReducer.isLoading,
});

ExploreByDrinkIngredients.propTypes = {
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  categoriesRequisition: PropTypes.func.isRequired,
  isLoadingCategory: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  categoriesRequisition: (type) => dispatch(getCategoriesDrinks(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByDrinkIngredients);

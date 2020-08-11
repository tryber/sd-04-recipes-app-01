import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getCategoriesDrinks } from '../Redux/Actions/index';
import { connect } from 'react-redux';
import CardsIngredients from '../Components/CardsIngredients';

const ExploreByDrinkIngredients = ({ location: { pathname }, categoriesRequisition }) => {
  useEffect(() => {
    categoriesRequisition('ingredient');
  }, [categoriesRequisition]);

  return (
    <div>
    <Header pathname={pathname} />
    <CardsIngredients pathname={pathname}/>
    <Footer />
  </div>
  )
};

ExploreByDrinkIngredients.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  categoriesRequisition: (type) => dispatch(getCategoriesDrinks(type)),
});

export default connect(null, mapDispatchToProps)(ExploreByDrinkIngredients);


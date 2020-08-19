import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getCategoriesFoods } from '../Redux/Actions/index';
import CardsIngredients from '../Components/CardsIngredients';
import Phrases from '../Components/Phrases';

const ExploreByFoodIngredients = ({
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

ExploreByFoodIngredients.propTypes = {
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  categoriesRequisition: PropTypes.func.isRequired,
  isLoadingCategory: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoadingCategory: state.categoriesFoodsReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  categoriesRequisition: (type) => dispatch(getCategoriesFoods(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByFoodIngredients);

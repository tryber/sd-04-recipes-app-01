import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from '../Components/SearchBar';
import Cards from '../Components/Cards';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getFoods, getCategoriesFoods } from '../Redux/Actions/index';
import CategoriesDropdown from '../Components/CategoriesDropdown';
import Phrases from '../Components/Phrases';

const ExploreByArea = ({
  location: { pathname },
  categoriesRequisition,
  cardsRequisition,
  isLoadingCategory,
  isLoadingFood,
}) => {
  useEffect(() => {
    cardsRequisition();
    categoriesRequisition('area');
  }, [cardsRequisition, categoriesRequisition]);

  if (isLoadingCategory && isLoadingFood) return <Phrases />;
  return (
    <div>
      <Header pathname={pathname} />
      <SearchBar request={cardsRequisition} />
      <CategoriesDropdown pathname={pathname} />
      <Cards request={cardsRequisition} pathname={pathname} />
      <Footer />
    </div>
  );
};

ExploreByArea.propTypes = {
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  categoriesRequisition: PropTypes.func.isRequired,
  cardsRequisition: PropTypes.func.isRequired,
  isLoadingCategory: PropTypes.bool.isRequired,
  isLoadingFood: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoadingCategory: state.categoriesDrinksReducer.isLoading,
  isLoadingFood: state.foodRequestReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: (filter, food) => dispatch(getFoods(filter, food)),
  categoriesRequisition: (type) => dispatch(getCategoriesFoods(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByArea);

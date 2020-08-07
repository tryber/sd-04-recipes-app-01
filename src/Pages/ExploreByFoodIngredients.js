import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const ExploreByFoodIngredients = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
    <Footer />
  </div>
);

ExploreByFoodIngredients.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default ExploreByFoodIngredients;

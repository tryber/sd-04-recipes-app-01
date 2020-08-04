import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const ExploreByFoodIngredients = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

ExploreByFoodIngredients.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default ExploreByFoodIngredients;

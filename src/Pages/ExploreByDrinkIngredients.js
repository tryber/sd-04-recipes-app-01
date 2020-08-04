import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const ExploreByDrinkIngredients = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

ExploreByDrinkIngredients.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default ExploreByDrinkIngredients;

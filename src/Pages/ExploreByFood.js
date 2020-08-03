import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const ExploreByFood = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

ExploreByFood.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default ExploreByFood;

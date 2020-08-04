import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const ExploreByDrink = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

ExploreByDrink.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default ExploreByDrink;

import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const ExploreByArea = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

ExploreByArea.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default ExploreByArea;

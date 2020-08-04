import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const Explore = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

Explore.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default Explore;

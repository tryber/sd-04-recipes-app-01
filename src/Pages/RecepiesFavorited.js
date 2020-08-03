import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const RecepiesFavorited = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

RecepiesFavorited.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default RecepiesFavorited;

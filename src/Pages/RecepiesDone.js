import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const RecepiesDone = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

RecepiesDone.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default RecepiesDone;

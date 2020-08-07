import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Explore = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
    <Footer />
  </div>
);

Explore.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default Explore;

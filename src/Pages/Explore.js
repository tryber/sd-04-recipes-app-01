import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Explore = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
    <Link to="/explorar/comidas">
      <button data-testid="explore-food">Explorar Comidas</button>
    </Link>
    <Link to="/explorar/bebidas">
      <button data-testid="explore-drinks">Explorar Bebidas</button>
    </Link>
    <Footer />
  </div>
);

Explore.propTypes = {
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
};

export default Explore;

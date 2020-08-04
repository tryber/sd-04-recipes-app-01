import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardsDrink from '../Components/CardsDrink';
import { getDrinks } from '../Redux/Actions/index';
import Header from '../Components/Header';

const Drinks = ({ isLoading, cardsRequisition, location: { pathname } }) => {
  useEffect(() => {
    cardsRequisition();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <Header pathname={pathname} />
      <h1>Drinks</h1>
      <CardsDrink />
    </div>
  );
};

Drinks.propTypes = {
  cardsRequisition: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.drinkRequestReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: () => dispatch(getDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);

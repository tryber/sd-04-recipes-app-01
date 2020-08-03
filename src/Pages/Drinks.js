import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardsDrink from '../Components/CardsDrink';
import { getDrinks } from '../Redux/Actions/index';

const Drinks = ({ isLoading, cardsRequisition }) => {
  useEffect(() => {
    cardsRequisition();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <h1>Drinks</h1>
      <CardsDrink />
    </div>
  );
};

Drinks.propTypes = {
  cardsRequisition: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoading: state.drinkRequestReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: () => dispatch(getDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardsFood from '../Components/CardsFood';
import { getFoods } from '../Redux/Actions/index';

const Meals = ({ isLoading, cardsRequisition }) => {
  useEffect(() => {
    cardsRequisition();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <h1>Meals</h1>
      <CardsFood />
    </div>
  );
};

Meals.propTypes = {
  cardsRequisition: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isLoading: state.foodRequestReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: () => dispatch(getFoods()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);

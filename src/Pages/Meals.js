import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardsFood from '../Components/CardsFood';
import { getFoods } from '../Redux/Actions/index';
import SearchBar from '../Components/SearchBar';

const Meals = ({ isLoading, cardsRequisition, requestFoods }) => {
  useEffect(() => {
    cardsRequisition();
  }, [cardsRequisition]);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <SearchBar request={requestFoods} />
      <CardsFood />
    </div>
  );
};

Meals.propTypes = {
  cardsRequisition: PropTypes.func.isRequired,
  requestFoods: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.foodRequestReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: () => dispatch(getFoods()),
  requestFoods: (filter, food) => dispatch(getFoods(filter, food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);

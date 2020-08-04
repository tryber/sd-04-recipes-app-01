import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardsFood from '../Components/CardsFood';
import { getFoods } from '../Redux/Actions/index';
import SearchBar from '../Components/SearchBar';
import Header from '../Components/Header';

const Meals = ({ isLoading, cardsRequisition, location: { pathname } }) => {
  useEffect(() => {
    cardsRequisition();
  }, [cardsRequisition]);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <Header pathname={pathname} />
      <SearchBar request={cardsRequisition} />
      <CardsFood request={cardsRequisition} />
    </div>
  );
};

Meals.propTypes = {
  cardsRequisition: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.foodRequestReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: (filter, food) => dispatch(getFoods(filter, food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meals);

import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardsDrink from '../Components/CardsDrink';
import { getDrinks } from '../Redux/Actions/index';
import SearchBar from '../Components/SearchBar';
import Header from '../Components/Header';

const Drinks = ({ isLoading, cardsRequisition, requestDrinks, location: { pathname } }) => {
  useEffect(() => {
    cardsRequisition();
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  return (
    <div>
      <Header pathname={pathname} />
      <SearchBar request={requestDrinks} />
      <CardsDrink />
    </div>
  );
};

Drinks.propTypes = {
  cardsRequisition: PropTypes.func.isRequired,
  requestDrinks: PropTypes.func.isRequired,
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
  requestDrinks: (filter, drink) => dispatch(getDrinks(filter, drink)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drinks);

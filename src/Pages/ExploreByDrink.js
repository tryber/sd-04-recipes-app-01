import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { RandomDrink } from '../Redux/Actions/index';

const ExploreByDrink = (props) => {
  const {
    id,
    getRandomDrinkID,
    location: { pathname },
  } = props;

  useEffect(() => {
    getRandomDrinkID();
  }, [getRandomDrinkID]);

  if (id.drinks === undefined) {
    return 'Loading';
  }
  const { idDrink } = id.drinks[0];
  return (
    <div>
      <Header pathname={pathname} />
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient">Por Ingredientes</button>
      </Link>
      <Link to={`/bebidas/${idDrink}`}>
        <button data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
      <Footer />
    </div>
  );
};

ExploreByDrink.propTypes = {
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  id: PropTypes.string.isRequired,
  getRandomDrinkID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  id: state.randomReducer.randomID,
});

const mapDispatchToProps = (dispatch) => ({
  getRandomDrinkID: () => dispatch(RandomDrink()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByDrink);

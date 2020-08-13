import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { connect } from 'react-redux';
import Footer from '../Components/Footer';
import { RandomFood } from '../Redux/Actions/index';

const ExploreByFood = (props) => {
  const { id, getRandomFoodID, location: { pathname } } = props;

useEffect(() => {
  getRandomFoodID();
}, [getRandomFoodID]);

if (id.meals === undefined ) {
  return "Loading"
} 
const { idMeal } = id.meals[0]
  console.log(id.meals);
  return (
    <div>
      <Header pathname={pathname} />
      <Link to="/explorar/comidas/ingredientes">
        <button data-testid="explore-by-ingredient">Por Ingredientes</button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button data-testid="explore-by-area">Por Local de Origem</button>
      </Link>
      <Link to= {`/comidas/${idMeal}`}>
        <button data-testid="explore-surprise">Me Surpreenda!</button>
      </Link>
      <Footer />
    </div>
  );
};

ExploreByFood.propTypes = {
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  id: PropTypes.string.isRequired,
  getRandomFoodID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  id: state.randomReducer.randomID,
});

const mapDispatchToProps = (dispatch) => ({
  getRandomFoodID: () => dispatch(RandomFood()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExploreByFood);

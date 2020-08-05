import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { createNewArr } from '../helpers';

const CardsFood = ({ meals, request }) => {

  if (meals === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    request();
    return <div />;
  }

  if (meals.length === 1 && meals[0].idMeal !== '52968') return <Redirect to={`/comidas/${meals[0].idMeal}`} />;

  return (
    <div>
      {createNewArr(meals).map((item, i) => (
        <Link to={`/comidas/${item.idMeal}`} key={item.idMeal}>
          <div key={item.idMeal} data-testid={`${i}-recipe-card`}>
            <img
              key={item.idMeal}
              src={item.strMealThumb}
              width="200"
              data-testid={`${i}-card-img`}
              alt={item.strMeal}
            />
            <p key={item.strMeal} data-testid={`${i}-card-name`}>
              {item.strMeal}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

CardsFood.propTypes = {
  request: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  meals: state.foodRequestReducer.foods,
});

export default connect(mapStateToProps)(CardsFood);

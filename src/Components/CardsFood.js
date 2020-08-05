import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const CardsFood = ({ meals }) => {
  let newArrFoods = [];

  if (meals.length > 12) {
    for (let index = 0; index < 12; index += 1) {
      newArrFoods.push(meals[index]);
    }
  } else newArrFoods = [...meals];

  return (
    <div>
      {newArrFoods.map((item, i) => (
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
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  meals: state.foodRequestReducer.foods,
});

export default connect(mapStateToProps, null)(CardsFood);

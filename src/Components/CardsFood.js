import PropTypes, { object } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

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
      ))}
    </div>
  );
};

CardsFood.propTypes = {
  meals: PropTypes.arrayOf(object).isRequired,
};

const mapStateToProps = (state) => ({
  meals: state.foodRequestReducer.foods,
});

export default connect(mapStateToProps, null)(CardsFood);

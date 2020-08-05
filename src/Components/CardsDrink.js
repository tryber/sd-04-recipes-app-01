import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

const CardsDrink = ({ drinks, request }) => {
  let newArrDrinks = [];

  if (drinks === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    request();
    return <div />;
  }

  if (drinks.length === 1) return <Redirect to={`/bebidas/${drinks[0].idDrink}`} />;

  if (drinks.length > 12) {
    for (let index = 0; index < 12; index += 1) {
      newArrDrinks.push(drinks[index]);
    }
  } else newArrDrinks = [...drinks];

  return (
    <div>
      {console.log(newArrDrinks)}
      {newArrDrinks.map((item, i) => (
        <Link to={`/bebidas/${item.idDrink}`} key={item.idDrink}>
          <div key={item.idDrink} data-testid={`${i}-recipe-card`}>
            <img
              key={item.idDrink}
              src={item.strDrinkThumb}
              width="200"
              data-testid={`${i}-card-img`}
              alt={item.strDrink}
            />
            <p key={item.strDrink} data-testid={`${i}-card-name`}>
              {item.strDrink}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

CardsDrink.propTypes = {
  request: PropTypes.func.isRequired,
  drinks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  drinks: state.drinkRequestReducer.drinks,
});

export default connect(mapStateToProps)(CardsDrink);

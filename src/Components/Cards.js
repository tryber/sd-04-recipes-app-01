import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createNewArr, recomendationItemKeysToCards } from '../helpers';

const Cards = (props) => {
  const { meals, drinks, request, pathname } = props;
  const { id, strName, strThumb } = recomendationItemKeysToCards(pathname);

  let type = meals;
  if (pathname.includes('/bebidas')) type = drinks;
  console.log(type);

  let newPathname = pathname;
  if (pathname.includes('/explorar')) newPathname = '/comidas';

  if (type === null) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    request();
    return <div />;
  }

  if (type.length === 1 && type[0][id] !== '52968') return <Redirect to={`${newPathname}/${type[0][id]}`} />;
  return (
    <div>
      {createNewArr(type).map((item, i) => (
        <Link to={`${newPathname}/${item[id]}`} key={item[id]}>
          <div key={item[id]} data-testid={`${i}-recipe-card`}>
            <img
              key={item[id]}
              src={item[strThumb]}
              width="200"
              data-testid={`${i}-card-img`}
              alt={item[strName]}
            />
            <p key={item[strName]} data-testid={`${i}-card-name`}>
              {item[strName]}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

Cards.propTypes = {
  pathname: PropTypes.string.isRequired,
  request: PropTypes.func.isRequired,
  drinks: PropTypes.arrayOf(Object).isRequired,
  meals: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  meals: state.foodRequestReducer.foods,
  drinks: state.drinkRequestReducer.drinks,
});

export default connect(mapStateToProps)(Cards);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createNewArr, recomendationItemKeys } from '../../helpers';
import './Recomendations.css';

const Recomendations = (props) => {
  const { pathName, stateDrinksOrFoods } = props;
  const { id, strName, strThumb } = recomendationItemKeys(pathName.path);
  console.log(id, strName, strThumb);
  console.log(stateDrinksOrFoods);
  console.log(pathName);
  let whereShouldItGo = 'comidas';
  if (pathName.path.includes('/comidas')) {
    whereShouldItGo = 'bebidas';
  }
  return (
    <div className="recomendations" data-testid="recomendation-card">
      {createNewArr(stateDrinksOrFoods, 6).map((item, i) => (
        <Link to={`/${whereShouldItGo}/${item[id]}`} key={item[id]}>
          <div className="recomendations-card" key={item[id]} data-testid={`${i}-recomendation-card`}>
            <img
              key={item[id]}
              src={item[strThumb]}
              width="150"
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

Recomendations.propTypes = {
  pathName: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
  stateDrinksOrFoods: PropTypes.arrayOf(Object).isRequired,
};

export default Recomendations;

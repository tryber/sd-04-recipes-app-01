import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createNewArr, recomendationItemKeys } from '../../helpers';
import './Recomendations.css';

const Recomendations = (props) => {
  const { pathName, stateDrinksOrFoods } = props;
  const { id, strName, strThumb } = recomendationItemKeys(pathName.path);
  let whereShouldItGo = 'comidas';
  if (pathName.path.includes('/comidas')) {
    whereShouldItGo = 'bebidas';
  }
  return (
    <div className="recomendations">
      {createNewArr(stateDrinksOrFoods, 6).map((item, i) => (
        <Link to={`/${whereShouldItGo}/${item[id]}`} key={item[id]}>
          <div className="recomendations-card" key={item[id]} data-testid={`${i}-recomendation-card`}>
            <img
              key={item[id]}
              src={item[strThumb]}
              width="150"
              alt={item[strName]}
            />
            <p key={item[strName]} data-testid={`${i}-recomendation-title`}>
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

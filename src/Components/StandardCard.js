import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const StandardCard = ({ recipe, i }) => (
  <div>
    <Link to={`/${recipe.type}s/${recipe.id}`}>
      <img width="200" key={recipe.image} data-testid={`${i}-horizontal-image`} src={recipe.image} alt="recipe" />
    </Link>
    <p data-testid={`${i}-horizontal-top-text`}>{(recipe.type === 'comida') ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}</p>
    <Link to={`/${recipe.type}s/${recipe.id}`}>
      <h1 data-testid={`${i}-horizontal-name`}>{recipe.name}</h1>
    </Link>
  </div>
);

StandardCard.propTypes = {
  i: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

export default StandardCard;

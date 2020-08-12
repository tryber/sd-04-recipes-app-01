import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createNewArr, recomendationIngredientsToCards } from '../helpers';

const CardsIngredients = (props) => {
  const { ingredientsListFood, ingredientsListDrink, pathname } = props;
  const { strName } = recomendationIngredientsToCards(pathname);

  let type = ingredientsListFood;
  let newPathname = '/comidas';
  let link = 'https://www.themealdb.com/images/ingredients';
  if (pathname.includes('/bebidas')) {
    type = ingredientsListDrink;
    link = 'https://www.thecocktaildb.com/images/ingredients';
    newPathname = '/bebidas';
  }

  return (
    <div>
      {createNewArr(type).map((item, i) => (
        <Link key={item[strName]} to={{ pathname: `${newPathname}/`, name: item[strName] }}>
          <div key={item[strName]} data-testid={`${i}-ingredient-card`}>
            <img
              data-testid={`${i}-card-img`}
              src={`${link}/${item[strName]}-Small.png`}
              width="200"
              alt={item[strName]}
            />
            <p data-testid={`${i}-card-name`}>{item[strName]}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

CardsIngredients.propTypes = {
  pathname: PropTypes.string.isRequired,
  ingredientsListDrink: PropTypes.arrayOf(Object).isRequired,
  ingredientsListFood: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  ingredientsListFood: state.categoriesFoodsReducer.categoriesFoods,
  ingredientsListDrink: state.categoriesDrinksReducer.categoriesDrinks,
});

export default connect(mapStateToProps)(CardsIngredients);

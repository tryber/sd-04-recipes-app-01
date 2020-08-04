import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getDrinks } from '../Redux/Actions/index';
import { createNewCategories } from '../helpers';

const CategoriesDrink = ({ categoriesList, cardsRequisition }) => {
  const [valueCategory, setValueCategory] = useState('');

  const changeCategory = (nameCategory) => {
    if (valueCategory === nameCategory) {
      setValueCategory('');
      cardsRequisition();
    } else {
      setValueCategory(nameCategory);
      cardsRequisition(nameCategory);
    }
  };

  return (
    <div>
      <button data-testid="All-category-filter" onClick={() => changeCategory()}>
        All
      </button>
      {createNewCategories(categoriesList).map((item) => (
        <button
          data-testid={`${item.strCategory}-category-filter`}
          key={item.strCategory}
          value={item.strCategory}
          onClick={() => changeCategory(item.strCategory)}
        >
          {item.strCategory}
        </button>
      ))}
    </div>
  );
};

CategoriesDrink.propTypes = {
  cardsRequisition: PropTypes.func.isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  categoriesList: state.categoriesDrinksReducer.categoriesDrinks,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: (obj) => dispatch(getDrinks(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesDrink);

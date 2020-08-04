import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getFoods } from '../Redux/Actions/index';

const createNewCategories = (categoriesList) => {
  const newArrCategories = [];
  if (categoriesList.length > 0) {
    for (let index = 0; index < 5; index += 1) {
      newArrCategories.push(categoriesList[index]);
    }
  }
  return newArrCategories;
};

const CategoriesFood = ({ categoriesList, cardsRequisition }) => {
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

CategoriesFood.propTypes = {
  cardsRequisition: PropTypes.func.isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  categoriesList: state.categoriesFoodsReducer.categoriesFoods,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: (obj) => dispatch(getFoods(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesFood);

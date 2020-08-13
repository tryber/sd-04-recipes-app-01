import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getDrinks, getFoods } from '../Redux/Actions/index';
import { createNewCategories } from '../helpers';

const Categories = ({
  categoriesListDrinks,
  categoriesListFoods,
  cardsRequisitionDrinks,
  cardsRequisitionFoods,
  pathname,
}) => {
  const [valueCategory, setValueCategory] = useState('');

  let categoriesList = categoriesListDrinks;
  let cardsRequisition = cardsRequisitionDrinks;
  if (pathname.includes('/comida')) {
    categoriesList = categoriesListFoods;
    cardsRequisition = cardsRequisitionFoods;
  }

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
    <div className=" header-categories">
      <button className="btn btn-dark btn-sm button-categories" data-testid="All-category-filter" onClick={() => changeCategory()}>
        All
      </button>
      {createNewCategories(categoriesList).map((item) => (
        <button
          className="btn btn-dark btn-sm button-categories"
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

Categories.propTypes = {
  pathname: PropTypes.string.isRequired,
  cardsRequisitionDrinks: PropTypes.func.isRequired,
  cardsRequisitionFoods: PropTypes.func.isRequired,
  categoriesListDrinks: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoriesListFoods: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  categoriesListDrinks: state.categoriesDrinksReducer.categoriesDrinks,
  categoriesListFoods: state.categoriesFoodsReducer.categoriesFoods,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisitionDrinks: (obj) => dispatch(getDrinks(obj)),
  cardsRequisitionFoods: (obj) => dispatch(getFoods(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

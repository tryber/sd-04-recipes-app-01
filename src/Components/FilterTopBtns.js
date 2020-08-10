import React from 'react';
import PropTypes from 'prop-types';

const FilterTopBtns = ({ filterRecipes }) => (
  <div>
    <button
      onClick={(e) => filterRecipes(e)}
      name="All"
      data-testid="filter-by-all-btn"
      type="button"
    >
      All
    </button>
    <button
      onClick={(e) => filterRecipes(e)}
      name="Foods"
      data-testid="filter-by-food-btn"
      type="button"
    >
      Food
    </button>
    <button
      onClick={(e) => filterRecipes(e)}
      name="Drinks"
      data-testid="filter-by-drink-btn"
      type="button"
    >
      Drinks
    </button>
  </div>
);

FilterTopBtns.propTypes = {
  filterRecipes: PropTypes.func.isRequired,
};

export default FilterTopBtns;

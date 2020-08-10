import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getFoods } from '../Redux/Actions/index';

const Categories = ({ categoriesList, cardsRequisition, pathname }) => {

  const changeCategory = (e) => {
    if (e.target.value === 'all') cardsRequisition();
    else cardsRequisition(e.target.value, `${pathname}`);
  };

  return (
    <div>
      <select data-testid="explore-by-area-dropdown" onChange={(e) => changeCategory(e)}>
        <option value="all" data-testid="All-option">
          All
        </option>
      {(categoriesList).map((item) => (
        <option
          data-testid={`${item.strArea}-option`}
          key={item.strArea}
          value={item.strArea}
        >
          {item.strArea}
        </option>
      ))}
      </select>
    </div>
  );
};

Categories.propTypes = {
  pathname: PropTypes.string.isRequired,
  cardsRequisition: PropTypes.func.isRequired,
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  categoriesList: state.categoriesFoodsReducer.categoriesFoods,
});

const mapDispatchToProps = (dispatch) => ({
  cardsRequisition: (filter, food) => dispatch(getFoods(filter, food)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDetailsFoods } from '../Redux/Actions/index';
import RecipeFood from '../Components/RecipeFood';

const DetailsFood = (props) => {
  const { match: { params: { id } }, detailsRequisition, isLoadingDetails } = props;

  useEffect(() => {
    detailsRequisition(id);
  }, [detailsRequisition, id]);

  if (isLoadingDetails) return <h2>Loading...</h2>;
  return (
    <div>
      <h2>
        Detalhes da receita
      </h2>
      <RecipeFood />
    </div>
  );
};

DetailsFood.propTypes = {
  detailsRequisition: PropTypes.func.isRequired,
  isLoadingDetails: PropTypes.bool.isRequired,
  match: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  isLoadingDetails: state.detailsFoodsReducer.isLoading,
});


const mapDispatchToProps = (dispatch) => ({
  detailsRequisition: (id) => dispatch(getDetailsFoods(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFood);

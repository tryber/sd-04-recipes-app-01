import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDetailsFoods, getDrinks } from '../Redux/Actions/index';
import RecipeFood from '../Components/RecipeFood';
import Recomendations from '../Components/Recomendations/Recomendations';
import StartRecipeBtn from '../Components/StartRecipeBtn';
import Phrases from '../Components/Phrases';

const DetailsFood = ({
  match: {
    params: { id },
  },
  detailsRequisition,
  isLoadingDetails,
  drinksRequest,
  isLoadingRecomendation,
  match,
  drinks,
}) => {
  useEffect(() => {
    detailsRequisition(id);
    drinksRequest();
  }, [detailsRequisition, id, drinksRequest]);

  if (isLoadingDetails && isLoadingRecomendation) return <Phrases />;
  return (
    <div className="meals-page d-flex flex-column justify-content-center align-items-center">
      <div className="btn btn-primary header-div">
        <h2>Detalhes da receita</h2>
      </div>
      <RecipeFood pathName={match} />
      <Recomendations pathName={match} stateDrinksOrFoods={drinks} />
      <StartRecipeBtn pathName={match} id={id} />
    </div>
  );
};

DetailsFood.propTypes = {
  detailsRequisition: PropTypes.func.isRequired,
  drinksRequest: PropTypes.func.isRequired,
  drinks: PropTypes.arrayOf(Object).isRequired,
  isLoadingDetails: PropTypes.bool.isRequired,
  isLoadingRecomendation: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoadingDetails: state.detailsFoodsReducer.isLoading,
  isLoadingRecomendation: state.drinkRequestReducer.isLoading,
  drinks: state.drinkRequestReducer.drinks,
});

const mapDispatchToProps = (dispatch) => ({
  detailsRequisition: (id) => dispatch(getDetailsFoods(id)),
  drinksRequest: () => dispatch(getDrinks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsFood);

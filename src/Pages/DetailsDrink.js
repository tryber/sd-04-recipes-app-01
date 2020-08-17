import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDetailsDrinks, getFoods } from '../Redux/Actions/index';
import RecipeDrink from '../Components/RecipeDrink';
import Recomendations from '../Components/Recomendations/Recomendations';
import StartRecipeBtn from '../Components/StartRecipeBtn';
import Phrases from '../Components/Phrases';

const DetailsDrink = ({
  match: { params: { id } },
  detailsRequisition,
  isLoadingDetails,
  foodsRequest,
  isLoadingRecomendation,
  match,
  foods,
}) => {
  useEffect(() => {
    detailsRequisition(id);
    foodsRequest();
  }, [detailsRequisition, id, foodsRequest]);

  if (isLoadingDetails && isLoadingRecomendation) return <Phrases />;
  return (
    <div>
      <h2>
        Detalhes da receita
      </h2>
      <RecipeDrink pathName={match} />
      <Recomendations pathName={match} stateDrinksOrFoods={foods} />
      <StartRecipeBtn pathName={match} id={id} />
    </div>
  );
};

DetailsDrink.propTypes = {
  detailsRequisition: PropTypes.func.isRequired,
  isLoadingDetails: PropTypes.bool.isRequired,
  foodsRequest: PropTypes.func.isRequired,
  foods: PropTypes.arrayOf(Object).isRequired,
  isLoadingRecomendation: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoadingDetails: state.detailsDrinksReducer.isLoading,
  isLoadingRecomendation: state.foodRequestReducer.isLoading,
  foods: state.foodRequestReducer.foods,
});

const mapDispatchToProps = (dispatch) => ({
  detailsRequisition: (id) => dispatch(getDetailsDrinks(id)),
  foodsRequest: () => dispatch(getFoods()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);

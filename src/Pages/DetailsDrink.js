import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDetailsDrinks } from '../Redux/Actions/index';

const DetailsDrink = (props) => {
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
    </div>
  );
};

DetailsDrink.propTypes = {
  detailsRequisition: PropTypes.func.isRequired,
  isLoadingDetails: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  isLoadingDetails: state.detailsDrinksReducer.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  detailsRequisition: (id) => dispatch(getDetailsDrinks(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsDrink);

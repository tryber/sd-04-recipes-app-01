import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import saveToLocalStorage from '../helpers/index';
import { redirectAct } from '../Redux/Actions';

const ButtonLogin = ({ email, password, shouldRedirect }) => {
  const HandleButton = () => {
    const dataToStorage = {
      email,
    };
    saveToLocalStorage('user', dataToStorage);
    saveToLocalStorage('mealsToken', 1);
    saveToLocalStorage('cocktailsToken', 1);
    shouldRedirect();
  };

  function validateEmail(emailToVerify) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(emailToVerify).toLowerCase());
  }

  return (
    <div>
      {validateEmail(email) && password.length > 6 ? (
        <button type="button" className="btn btn-primary btn-sm btn-block" onClick={HandleButton} data-testid="login-submit-btn">
          Entrar
        </button>
      ) : (
        <button type="button" className="btn btn-secondary btn-sm btn-block" disabled data-testid="login-submit-btn">
          Entrar
        </button>
      )}
    </div>
  );
};

ButtonLogin.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  shouldRedirect: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.loginReducer,
});

const mapDispatchToProps = (dispatch) => ({
  shouldRedirect: () => dispatch(redirectAct()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonLogin);

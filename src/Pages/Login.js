import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { changeInputAct } from '../Redux/Actions';
import ButtonLogin from '../Components/ButtonLogin';

class Login extends React.Component {
  render() {
    const { changeInput, shouldRedirect } = this.props;
    if (shouldRedirect) {
      return <Redirect to="/comidas" />;
    }
    return (
      <div className="card border-lg border-primary rounded-lg login">
        <p className="card-header text-center text-header font-weight-bold">Login</p>
        <div className="card-body d-flex flex-column align-items-center">
          <label htmlFor="email" />

          <input
            className="input border-primary rounded-lg"
            name="email"
            onChange={(event) => changeInput(event)}
            type="email"
            data-testid="email-input"
            placeholder="E-mail"
          />
          <label htmlFor="password" />
          <br />
          <input
            className="input border-primary rounded-lg"
            name="password"
            type="password"
            onChange={(event) => changeInput(event)}
            data-testid="password-input"
            placeholder="Password"
          />
        </div>
        <ButtonLogin />
      </div>
    );
  }
}

Login.propTypes = {
  changeInput: PropTypes.func.isRequired,
  shouldRedirect: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.reducerList,
  shouldRedirect: state.loginReducer.shouldRedirect,
});

const mapDispatchToProps = (dispatch) => ({
  changeInput: (event) => dispatch(changeInputAct(event.target)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

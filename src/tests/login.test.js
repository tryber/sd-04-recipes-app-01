import React from 'react';
import { fireEvent } from '@testing-library/react';

import renderWithReduxAndRouter from './renderWithReduxAndRouter';

import App from '../App';

describe('Login page', () => {
  test('render Login page', () => {
    const { getByText } = renderWithReduxAndRouter(<App />);
    const Login = getByText('Login');
    expect(Login).toBeInTheDocument();
  });

  test('should have email input that works', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, {
      initialState: { loginReducer: { email: '', password: '', shouldRedirect: false } },
      initialEntries: ['/'],
    });
    const email = getByTestId('email-input');
    expect(email).toBeInTheDocument();
    expect(email.type).toBe('email');

    fireEvent.change(email, { target: { value: 'someInvalidEmail@' } });
    expect(email.value).toBe('someInvalidEmail@');
  });

  test('should have password input that works', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, {
      initialState: { loginReducer: { email: '', password: '', shouldRedirect: false } },
      initialEntries: ['/'],
    });
    const password = getByTestId('password-input');
    expect(password).toBeInTheDocument();
    expect(password.type).toBe('password');

    fireEvent.change(password, { target: { value: 'someValidPassword' } });
    expect(password.value).toBe('someValidPassword');
  });

  test('should have a disabled submit button', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, {
      initialState: { loginReducer: { email: '', password: '', shouldRedirect: false } },
      initialEntries: ['/'],
    });
    const submitButton = getByTestId('login-submit-btn');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toBe('Entrar');
    expect(submitButton).toBeDisabled();
  });

  test('should not enable button when email is not valid', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, {
      initialState: { loginReducer: { email: '', password: '', shouldRedirect: false } },
      initialEntries: ['/'],
    });
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');

    fireEvent.change(email, { target: { value: 'someInvalidEmail@' } });
    fireEvent.change(password, { target: { value: 'someValidPassword' } });

    const submitButton = getByTestId('login-submit-btn');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test('should not enable button when the password has less than 6 characters', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, {
      initialState: { loginReducer: { email: '', password: '', shouldRedirect: false } },
      initialEntries: ['/'],
    });
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');

    fireEvent.change(email, { target: { value: 'someInvalidEmail@' } });
    fireEvent.change(password, { target: { value: 'someI' } });

    const submitButton = getByTestId('login-submit-btn');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    fireEvent.change(password, { target: { value: 'someIn' } });
    expect(submitButton).toBeDisabled();
  });

  test('should enable button when email and password are valid', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, {
      initialState: { loginReducer: { email: '', password: '', shouldRedirect: false } },
      initialEntries: ['/'],
    });
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');

    fireEvent.change(email, { target: { value: 'someValidEmail@email.com' } });
    fireEvent.change(password, { target: { value: 'someValidPassword' } });

    const submitButton = getByTestId('login-submit-btn');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  test('when the button is clicked the user email, mealsToken(1), cocktailsToken(1) should all be saved at the local storage', () => {
    const { getByTestId } = renderWithReduxAndRouter(<App />, {
      initialState: { loginReducer: { email: '', password: '', shouldRedirect: false } },
      initialEntries: ['/'],
    });
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');

    fireEvent.change(email, { target: { value: 'someValidEmail@email.com' } });
    fireEvent.change(password, { target: { value: 'someValidPassword' } });

    const submitButton = getByTestId('login-submit-btn');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);
    const user = { email: email.value };
    const userAtlocalStorage = JSON.parse(localStorage.getItem('user'));
    expect(userAtlocalStorage).toEqual(user);
  });

  test('when the button is clicked the App should redirect to /comidas', () => {
    const { getByTestId, history } = renderWithReduxAndRouter(<App />, {
      initialState: { loginReducer: { email: '', password: '', shouldRedirect: false } },
      initialEntries: ['/'],
    });
    const email = getByTestId('email-input');
    const password = getByTestId('password-input');

    fireEvent.change(email, { target: { value: 'someValidEmail@email.com' } });
    fireEvent.change(password, { target: { value: 'someValidPassword' } });

    const submitButton = getByTestId('login-submit-btn');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    expect(history.location.pathname).toBe('/comidas');
  });
});

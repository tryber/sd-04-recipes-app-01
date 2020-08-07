import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getLocalStorage } from '../helpers';

const Profile = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
    <h2 data-testid="profile-email">{getLocalStorage('user').email}</h2>
    <Link to="/receitas-feitas">
      <button data-testid="profile-done-btn">Receitas Feitas</button>
    </Link>
    <Link to="/receitas-favoritas">
      <button data-testid="profile-favorite-btn">Receitas Favoritas</button>
    </Link>
    <Link to="/">
      <button type="submit" data-testid="profile-logout-btn" onClick={() => localStorage.clear()}>
        Sair
      </button>
    </Link>
    <Footer />
  </div>
);

Profile.propTypes = {
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
};

export default Profile;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { getLocalStorage } from '../helpers';

const Profile = ({ location: { pathname } }) => (
  <div className="profile-page">
    <Header pathname={pathname} />
    <div className="profile-itens">
      <p data-testid="profile-email">{getLocalStorage('user').email}</p>
      <div className="profile-itens-buttons">
        <Link to="/receitas-feitas">
          <button className="btn btn-primary btn-lg btn-block button-profile" data-testid="profile-done-btn">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas">
          <button className="btn btn-primary btn-lg btn-block button-profile" data-testid="profile-favorite-btn">Receitas Favoritas</button>
        </Link>
        <Link to="/">
          <button className="btn btn-primary btn-lg btn-block button-profile" type="submit" data-testid="profile-logout-btn" onClick={() => localStorage.clear()}>
            Sair
          </button>
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

Profile.propTypes = {
  location: PropTypes.shape(PropTypes.string.isRequired).isRequired,
};

export default Profile;

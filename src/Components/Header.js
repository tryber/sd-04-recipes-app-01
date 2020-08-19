import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import profileImage from '../images/profileIcon.svg';
import SearchImage from '../images/searchIcon.svg';
import { showSearchBarAct } from '../Redux/Actions';

const renderInput = (Name, showSearchBar) => (
  <div className="header">
    <Link to="/perfil">
      <img className="no-shadow" data-testid="profile-top-btn" src={profileImage} alt="profile" />
    </Link>
    <h2 data-testid="page-title">{Name}</h2>
    <input
      className="no-shadow"
      type="image"
      src={SearchImage}
      onClick={() => showSearchBar()}
      data-testid="search-top-btn"
      alt="Search"
    />
  </div>
);

const renderOtherInput = (Name) => (
  <div className="header">
    <Link to="/perfil">
      <img className="no-shadow" data-testid="profile-top-btn" src={profileImage} alt="profile" />
    </Link>
    <h2 data-testid="page-title">{Name}</h2>
  </div>
);

const renderTitle = (pathname, showSearchBar) => {
  switch (pathname) {
    case '/comidas':
      return renderInput('Comidas', showSearchBar);
    case '/bebidas':
      return renderInput('Bebidas', showSearchBar);
    case '/explorar':
      return renderOtherInput('Explorar');
    case '/explorar/comidas':
      return renderOtherInput('Explorar Comidas');
    case '/explorar/bebidas':
      return renderOtherInput('Explorar Bebidas');
    case '/explorar/comidas/ingredientes':
      return renderOtherInput('Explorar Ingredientes');
    case '/explorar/bebidas/ingredientes':
      return renderOtherInput('Explorar Ingredientes');
    case '/explorar/comidas/area':
      return renderInput('Explorar Origem', showSearchBar);
    case '/perfil':
      return renderOtherInput('Perfil');
    case '/receitas-feitas':
      return renderOtherInput('Receitas Feitas');
    case '/receitas-favoritas':
      return renderOtherInput('Receitas Favoritas');
    default:
      return <h2>Nenhum título</h2>;
  }
};

const Header = (props) => {
  const { pathname, showSearchBar } = props;
  return (
    <div className="btn btn-primary header-div">
      {renderTitle(pathname, showSearchBar)}
    </div>
  );
};

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  showSearchBar: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showSearchBar: () => dispatch(showSearchBarAct()),
});
export default connect(null, mapDispatchToProps)(Header);

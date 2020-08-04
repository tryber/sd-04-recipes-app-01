import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import profileImage from '../images/profileIcon.svg';
import SearchImage from '../images/searchIcon.svg';
import { showSearchBarAct } from '../Redux/Actions';

const renderInput = (Name, showSearchBar) => (
  <div>
    <h2 data-testid="page-title">{Name}</h2>
    <input
      type="image"
      src={SearchImage}
      onClick={() => showSearchBar()}
      data-testid="search-top-btn"
      alt="Search"
    />
  </div>
);

const renderTitle = (pathname, showSearchBar) => {
  switch (pathname) {
    case '/comidas':
      return (
        renderInput('Comidas', showSearchBar)
      );
    case '/bebidas':
      return (
        renderInput('Bebidas', showSearchBar)
      );
    case '/explorar':
      return <h2 data-testid="page-title">Explorar</h2>;
    case '/explorar/comidas':
      return <h2 data-testid="page-title">Explorar Comidas</h2>;
    case '/explorar/bebidas':
      return <h2 data-testid="page-title">Explorar Bebidas</h2>;
    case '/explorar/comidas/ingredientes':
      return <h2 data-testid="page-title">Explorar Ingredientes</h2>;

    case '/explorar/bebidas/ingredientes':
      return <h2 data-testid="page-title">Explorar Ingredientes</h2>;
    case '/explorar/comidas/area':
      return (
        renderInput('Explorar Origem', showSearchBar)
      );
    case '/perfil':
      return <h2 data-testid="page-title">Perfil</h2>;
    case '/receitas-feitas':
      return <h2 data-testid="page-title">Receitas Feitas</h2>;
    case '/receitas-favoritas':
      return <h2 data-testid="page-title">Receitas Favoritas</h2>;
    default:
      return <h2>Nenhum título</h2>;
  }
};

const Header = (props) => {
  const { pathname, showSearchBar } = props;
  console.log(props);
  return (
    <div className="header">
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={profileImage} alt="profile" />
      </Link>
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

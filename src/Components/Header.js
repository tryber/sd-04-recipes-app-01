import React, { ReactFragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import profileImage from '../images/profileIcon.svg';
import SearchImage from '../images/searchIcon.svg';
import { showSearchBarAct } from '../Redux/Actions';

const renderTitle = (pathname, showSeachBar) => {
  switch (pathname) {
    case '/comidas':
      return (
        <>
          <h2 data-testid="page-title">Comidas</h2>
          <div>
            <input
              type="image"
              src={SearchImage}
              onClick={() => showSeachBar()}
              data-testid="search-top-btn"
              alt="Search"
            />
          </div>
        </>
      );
    case '/bebidas':
      return <h2 data-testid="page-title">Bebidas</h2>;
    case '/explorar':
      return <h2 data-testid="page-title">Explorar</h2>;
    case '/explorar/comidas':
      return <h2 data-testid="page-title">Explorar Comidas</h2>;
    case '/explorar/bebidas':
      return <h2 data-testid="page-title">Explorar Bebidas</h2>;
    case '/explorar/comidas/ingredientes' || '/explorar/bebidas/ingredientes':
      return <h2 data-testid="page-title">Explorar Ingredientes</h2>;
    case '/explorar/comidas/area':
      return (
        <>
          <h2 data-testid="page-title">Comidas</h2>
          <div>
            <input
              type="image"
              src={SearchImage}
              onClick={() => showSeachBar()}
              data-testid="search-top-btn"
              alt="Search"
            />
          </div>
        </>
      );
    case '/perfil':
      return <h2 data-testid="page-title">Perfil</h2>;
    case '/receitas-feitas':
      return <h2 data-testid="page-title">Receitas Feitas</h2>;
    case '/receitas-favoritas':
      return <h2 data-testid="page-title">Receitas Favoritadas</h2>;
    default:
      return <h2>Nenhum título</h2>;
  }
};

const Header = (props) => {
  const { pathname, showSeachBar } = props;
  console.log(props);
  return (
    <div>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={profileImage} alt="profile" />
      </Link>
      {renderTitle(pathname, showSeachBar)}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  showSeachBar: dispatch(showSearchBarAct()),
});
export default connect(null, mapDispatchToProps)(Header);

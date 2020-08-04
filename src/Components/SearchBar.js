import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

const SearchBar = ({ request, showSearchBar }) => {
  const [localState, setLocalState] = useState({ input: '', filter: '' });
  const handleChange = ({ target: { name, value } }) => {
    setLocalState({ ...localState, [name]: value });
  };
  const handleClick = () => {
    if (localState.input.length > 1 && localState.filter === 'Primeira letra') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      request(localState.filter, localState.input);
    }
  };

  if (showSearchBar) return <div />;
  return (
    <div>
      <div>
        <input
          data-testid="search-input"
          name="input"
          onChange={handleChange}
          placeholder="Buscar Receita"
        />
      </div>
      <input
        onClick={handleChange}
        id="Ingrediente"
        type="radio"
        name="filter"
        value="Ingrediente"
      />
      <label data-testid="ingredient-search-radio" htmlFor="Ingrediente">Ingrediente</label>
      <input onClick={handleChange} id="Nome" type="radio" name="filter" value="Nome" />
      <label data-testid="name-search-radio" htmlFor="Nome">Nome</label>
      <input onClick={handleChange} id="letra" type="radio" name="filter" value="Primeira letra" />
      <label data-testid="first-letter-search-radio" htmlFor="letra">Primeira letra</label>
      <div>
        <button data-testid="exec-search-btn" onClick={handleClick} type="button">
          Buscar
        </button>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  request: PropTypes.func.isRequired,
  showSearchBar: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  // showSearchBar: state.headerAndFooterReducer.showSearchBar,
});

export default connect(mapStateToProps)(SearchBar);

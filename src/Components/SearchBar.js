import React, { useState } from 'react';

const Searchbar = () => {
  console.log('test');
  const [localState, setLocalState] = useState({ input: '', radioButton: '' });
  const handleChange = ({ target: { name, value } }) => {
    setLocalState({ ...localState, [name]: value });
  };
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
    </div>
  );
};

export default Searchbar;

import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { getLocalStorage } from '../helpers';

const StartRecipeBtn = ({ id, pathName }) => {
  const [recipeDone, setRecipeDone] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const doneRecipes = getLocalStorage('doneRecipes');
  const inProgressRecipes = getLocalStorage('inProgressRecipes');

  let wereShouldItGo = `/comidas/${id}/in-progress`;
  let inProgressKey = 'meals';

  if (pathName.path === '/bebidas/:id') {
    wereShouldItGo = `/bebidas/${id}/in-progress`;
    inProgressKey = 'cocktails';
  }

  useEffect(() => {
    if (doneRecipes.find((recipe) => recipe.id === id)) setRecipeDone(false);
    if (inProgressRecipes[inProgressKey]) {
      if (Object.keys(inProgressRecipes[inProgressKey]).find((key) => key === id)) {
        setRecipeInProgress(true);
      }
    }
  }, [setRecipeDone, id, doneRecipes, setRecipeInProgress, inProgressRecipes, inProgressKey]);

  if (shouldRedirect) return <Redirect push to={wereShouldItGo} />;

  return (
    <div className="btnPosition">
      {recipeDone && (
        <button
          onClick={() => setShouldRedirect(true)}
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
        >
          {recipeInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      )}
    </div>
  );
};

StartRecipeBtn.propTypes = {
  id: PropTypes.string.isRequired,
  pathName: PropTypes.shape({
    path: PropTypes.string,
  }).isRequired,
};

export default StartRecipeBtn;

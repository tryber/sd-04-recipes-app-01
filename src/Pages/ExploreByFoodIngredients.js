import React from 'react';
import Header from '../Components/Header';

const ExploreByFoodIngredients = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

export default ExploreByFoodIngredients;

import React from 'react';
import Header from '../Components/Header';

const ExploreByFood = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

export default ExploreByFood;

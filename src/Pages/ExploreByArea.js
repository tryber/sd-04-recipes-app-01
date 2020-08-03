import React from 'react';
import Header from '../Components/Header';

const ExploreByArea = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

export default ExploreByArea;

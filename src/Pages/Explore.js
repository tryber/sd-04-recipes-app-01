import React from 'react';
import Header from '../Components/Header';

const Explore = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

export default Explore;

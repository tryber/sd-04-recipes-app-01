import React from 'react';
import Header from '../Components/Header';

const RecepiesDone = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

export default RecepiesDone;

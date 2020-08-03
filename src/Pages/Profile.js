import React from 'react';
import Header from '../Components/Header';

const Profile = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

export default Profile;

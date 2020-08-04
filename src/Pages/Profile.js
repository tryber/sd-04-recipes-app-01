import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';

const Profile = ({ location: { pathname } }) => (
  <div>
    <Header pathname={pathname} />
  </div>
);

Profile.propTypes = {
  location: PropTypes.shape(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default Profile;

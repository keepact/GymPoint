import React from 'react';
import { useSelector } from 'react-redux';

import { Image } from 'react-native';

import { Container } from './styles';

import logo from '~/assets/images/header-logo.png';

function Header() {
  const { signed } = useSelector(state => state.auth);

  return (
    <>
      {signed && (
        <Container>
          <Image source={logo} />
        </Container>
      )}
    </>
  );
}

export default Header;

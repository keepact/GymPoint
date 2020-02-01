import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth';

import logo from '~/assets/images/header-logo.svg';

import { Container, Content, Profile } from './styles';

function Header() {
  const dispatch = useDispatch();
  const { profile } = useSelector(state => state.user);

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Link to="/students">Alunos</Link>
          <Link to="/plans">Planos</Link>
          <Link to="/registrations">Matrículas</Link>
          <Link to="/help-orders">Pedidos de Auxílio</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Renan Rollo</strong>
              <button type="button" onClick={handleSignOut}>
                Sair do sistema
              </button>
            </div>
            <Link to="/profile">
              <img
                src={
                  profile
                    ? profile.avatar.url
                    : 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }
                alt="profile"
              />
            </Link>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;

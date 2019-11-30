import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from '~/assets/header-logo.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="" />
          <Link to="/students">Alunos</Link>
          <Link to="/plans">Planos</Link>
          <Link to="/registration">Matrículas</Link>
          <Link to="/help-orders">Pedidos de Auxílio</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Renan Rollo</strong>
              <Link to="/">Sair do sistema</Link>
              <Link to="/profile">Meu perfil</Link>
            </div>
            <img
              src={
                profile.avatar.url ||
                'https://api.adorable.io/avatars/50/abott@adorable.png'
              }
              alt="profile"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

import React from 'react';

import logo from '~/assets/logo.svg';

import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint" />

      <form>
        <label>Seu Email</label>
        <input type="email" placeholder="exemplo@email.com" />
        <label>Sua Senha</label>
        <input type="password" placeholder="*****" />

        <button type="submit">Acessar</button>
      </form>
    </>
  );
}

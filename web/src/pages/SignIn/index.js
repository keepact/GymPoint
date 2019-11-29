import React from 'react';

import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GymPoint" />

      <form>
        <label htmlFor="email">
          <span>Seu Email</span>
          <input name="email" type="email" placeholder="exemplo@email.com" />
        </label>
        <label htmlFor="password">
          <span>Sua Senha</span>
          <input name="password" type="password" />
        </label>

        <button type="submit">Acessar</button>
      </form>
    </>
  );
}

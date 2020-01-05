import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth';
import { validateSignIn } from '~/util/validation';

import logo from '~/assets/images/logo.svg';

export default function SignIn() {
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.auth);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={validateSignIn} onSubmit={handleSubmit}>
        <label htmlFor="email">Seu Email</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <label htmlFor="password">Sua Senha</label>
        <Input name="password" type="password" />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
      </Form>
    </>
  );
}

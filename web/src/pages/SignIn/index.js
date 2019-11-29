import React from 'react';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <label htmlFor="email">Seu Email</label>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <label htmlFor="password">Sua Senha</label>
        <Input name="password" type="password" />

        <button type="submit">Acessar</button>
      </Form>
    </>
  );
}

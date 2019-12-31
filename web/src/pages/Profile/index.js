import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth';
import { updateProfileRequest } from '~/store/modules/user/user';

import { validateProfile } from '~/util/validation';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

function Profile() {
  const dispatch = useDispatch();

  const { profile, loading } = useSelector(state => state.user);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form
        schema={validateProfile}
        initialData={profile}
        onSubmit={handleSubmit}
      >
        <AvatarInput name="avatar_id" />

        <Input name="name" placeholder="Nome completo" />
        <Input name="email" placeholder="Seu endereço de e-mail" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <button type="submit">
          {loading ? 'Carregando...' : 'Atualizar perfil'}
        </button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Sair do perfil
      </button>
    </Container>
  );
}

export default Profile;

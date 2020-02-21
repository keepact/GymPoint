import React from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

import { signOut } from '~/store/ducks/auth';
import { updateProfile } from '~/store/ducks/user';

import Input from '~/components/FormFields/Input';
import { validateProfile } from '~/util/validate';

import AvatarInput from './AvatarInput';

import { Container } from './styles';

function Profile({ handleSubmit, submitting }) {
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.user);

  const submit = data => {
    dispatch(updateProfile(data));
  };

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(data => submit(data))}>
        <AvatarInput />

        <Field
          name="name"
          htmlFor="name"
          type="text"
          placeholder="Nome completo"
          component={Input}
        />
        <Field
          name="email"
          htmlFor="email"
          type="email"
          placeholder="Seu endereço de e-mail"
          component={Input}
        />

        <hr />

        <Field
          name="oldPassword"
          htmlFor="oldPassword"
          type="password"
          placeholder="Sua senha atual"
          component={Input}
        />
        <Field
          name="password"
          htmlFor="password"
          type="password"
          placeholder="Nova senha"
          component={Input}
        />
        <Field
          name="confirmPassword"
          htmlFor="confirmPassword"
          type="password"
          placeholder="Confirmação de senha"
          component={Input}
        />

        <button type="submit" disabled={submitting}>
          {loading ? 'Carregando...' : 'Atualizar perfil'}
        </button>
      </form>

      <button type="button" onClick={handleSignOut}>
        Sair do perfil
      </button>
    </Container>
  );
}

Profile.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    initialValues: state.user.profile,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: 'PROFILE_FORM',
    validate: validateProfile,
  })(Profile)
);

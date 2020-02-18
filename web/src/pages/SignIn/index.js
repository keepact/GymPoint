import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

import { signInRequest } from '~/store/modules/auth';
import { validateSignIn } from '~/util/validate';

import renderField from '~/components/FormFields/renderField';
import logo from '~/assets/images/logo.svg';

function SignIn({ handleSubmit, submitting }) {
  const dispatch = useDispatch();

  const { loading } = useSelector(state => state.auth);

  const submit = data => {
    const { email, password } = data;
    dispatch(signInRequest(email, password));
  };

  return (
    <>
      <img src={logo} alt="GymPoint" />

      <form onSubmit={handleSubmit(data => submit(data))}>
        <Field
          name="email"
          htmlFor="email"
          label="Seu Email"
          type="email"
          placeholder="exemplo@email.com"
          component={renderField}
        />
        <Field
          name="password"
          htmlFor="password"
          label="Sua Senha"
          type="password"
          component={renderField}
        />

        <button disabled={submitting} type="submit">
          {loading ? 'Carregando...' : 'Acessar'}
        </button>
      </form>
    </>
  );
}

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'SIGN_IN_FORM',
  validate: validateSignIn,
})(SignIn);

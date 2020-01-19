import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signInRequest } from '~/store/modules/auth';

import logo from '~/assets/images/group-2.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  InputContainer,
} from './styles';

function SignIn() {
  const [identifaction, setIdentification] = useState('');

  const { loading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = id => {
    dispatch(signInRequest(id));
  };

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <InputContainer>
          <Icon name="perm-identity" size={20} color="#ddd" />
          <FormInput
            keyboardType="number-pad"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu ID de cadastro"
            value={identifaction}
            onChange={setIdentification}
          />
        </InputContainer>
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no Sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default SignIn;

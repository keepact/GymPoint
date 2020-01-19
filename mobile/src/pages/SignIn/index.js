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
  const [identification, setIdentification] = useState('');

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
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Informe seu ID de cadastro"
            value={identification}
            onChangeText={e => setIdentification(e)}
          />
        </InputContainer>
        <SubmitButton
          loading={loading}
          onPress={() => handleSubmit(identification)}>
          Entrar no Sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}

export default SignIn;

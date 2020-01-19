import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import logo from '~/assets/images/group-2.png';

import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  InputContainer,
} from './styles';

export default function SignIn() {
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
          />
        </InputContainer>
        <SubmitButton onPress={() => {}}>Entrar</SubmitButton>
      </Form>
    </Container>
  );
}

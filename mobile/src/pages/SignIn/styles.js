import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const InputContainer = styled.View`
  padding: 0 15px;
  height: 46px;
  border-radius: 4px;
  border: solid 1px #ddd;
  background-color: #fff;

  flex-direction: row;
  align-items: center;
`;

export const FormInput = styled.TextInput`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #ddd;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

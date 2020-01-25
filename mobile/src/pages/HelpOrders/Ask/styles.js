import styled from 'styled-components/native';

import { TextInput } from 'react-native';
import Button from '~/components/Button';

export const Container = styled.View`
  align-items: center;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 280px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 15px;
  width: 100%;
`;

export const TextArea = styled(TextInput).attrs({
  multiline: true,
  numberOfLines: 9,
})`
  text-align-vertical: top;
  justify-content: flex-start;
  width: 280px;
  margin-top: 10px;
  background: #fff;
  border: solid 1px #ddd;
  padding: 20px;
`;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';

import { helpOrderRequest } from '~/store/modules/helporder';

import { Container, TextArea, ButtonContainer, SubmitButton } from './styles';

function HelpOrderAsk() {
  const [value, setValue] = useState('');

  const { studentId } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(helpOrderRequest(studentId, value));
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding">
        <TextArea
          name="question"
          keyboardType="visible-password"
          autoCorrect={false}
          spellCheck={false}
          underlineColorAndroid="transparent"
          placeholder="Insira seu pedido de auxílio"
          onChangeText={text => setValue(text)}
          value={value}
        />
        <ButtonContainer>
          <SubmitButton onPress={handleSubmit}>Enviar pedido</SubmitButton>
        </ButtonContainer>
      </KeyboardAvoidingView>
    </Container>
  );
}

export default HelpOrderAsk;

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { KeyboardAvoidingView } from 'react-native';

import { questionRequest } from '~/store/modules/question';

import { Container, TextArea, ButtonContainer, SubmitButton } from './styles';

function HelpOrderAsk() {
  const [value, setValue] = useState('');

  const { studentId } = useSelector(state => state.checkin);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(questionRequest(studentId, value));
  };

  return (
    <Container>
      <KeyboardAvoidingView behavior="padding">
        <TextArea
          name="question"
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

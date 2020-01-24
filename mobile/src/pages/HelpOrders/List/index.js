import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Questions from '~/components/Questions';

import { questionRequest } from '~/store/modules/question';

import { Container, ButtonContainer, CheckInButton, List } from './styles';

function HelpOrderList() {
  const { studentId } = useSelector(state => state.checkin);
  const { questions } = useSelector(state => state.question);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(questionRequest(studentId));
  }, [dispatch, studentId]);

  const handleAddQuestion = () => {};

  return (
    <Container>
      <ButtonContainer>
        <CheckInButton onPress={handleAddQuestion}>
          Novo pedido de auxílio
        </CheckInButton>
      </ButtonContainer>

      <List
        data={questions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Questions data={item} />}
      />
    </Container>
  );
}

export default HelpOrderList;

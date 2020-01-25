import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Questions from '~/components/Questions';

import { questionRequest, redirectToCreate } from '~/store/modules/question';

import { Container, ButtonContainer, NewQuetionButton, List } from './styles';

function HelpOrderList() {
  const { studentId } = useSelector(state => state.checkin);
  const { questions } = useSelector(state => state.question);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(questionRequest(studentId));
  }, [dispatch, studentId]);

  const handleAddQuestion = () => {
    dispatch(redirectToCreate());
  };

  return (
    <Container>
      <ButtonContainer>
        <NewQuetionButton onPress={handleAddQuestion}>
          Novo pedido de auxílio
        </NewQuetionButton>
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

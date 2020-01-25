import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Questions from '~/components/Questions';

import { helpOrderRequest, helpOrderRedirect } from '~/store/modules/helporder';

import { Container, ButtonContainer, NewQuetionButton, List } from './styles';

function HelpOrderList() {
  const { studentId } = useSelector(state => state.checkin);
  const { helporders } = useSelector(state => state.helporder);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(helpOrderRequest(studentId));
  }, [dispatch, studentId]);

  const handleAddQuestion = () => {
    dispatch(helpOrderRedirect());
  };

  const handleGoToAnswer = item => {
    dispatch(helpOrderRedirect(item));
  };

  return (
    <Container>
      <ButtonContainer>
        <NewQuetionButton onPress={handleAddQuestion}>
          Novo pedido de auxílio
        </NewQuetionButton>
      </ButtonContainer>

      <List
        data={helporders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Questions data={item} onSubmit={() => handleGoToAnswer(item)} />
        )}
      />
    </Container>
  );
}

export default HelpOrderList;

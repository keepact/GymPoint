import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Questions from '~/components/Questions';

import { helpOrderRequest, helpOrderRedirect } from '~/store/modules/helporder';

import { Container, ButtonContainer, NewQuetionButton, List } from './styles';

function HelpOrderList() {
  const { helporders } = useSelector(state => state.helporder);

  const dispatch = useDispatch();
  const firstRender = useMemo(() => helporders.length === 0, [helporders]);

  useEffect(() => {
    if (firstRender) {
      dispatch(helpOrderRequest());
    }
  }, [dispatch, firstRender]);

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

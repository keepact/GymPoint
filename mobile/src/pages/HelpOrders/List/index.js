import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { helpOrderRequest, helpOrderRedirect } from '~/store/modules/helporder';

import Loading from '~/components/Loading';
import Questions from '~/components/Questions';

import {
  Container,
  ButtonContainer,
  NewQuetionButton,
  Footer,
  List,
} from './styles';

function HelpOrderList() {
  const { helporders, loading, page, lastPage } = useSelector(
    state => state.helporder,
  );

  const dispatch = useDispatch();
  const firstRender = useMemo(() => helporders.length === 0, [helporders]);

  useEffect(() => {
    if (firstRender) {
      dispatch(helpOrderRequest(page));
    }
  }, [dispatch, firstRender, page]);

  const handleAddQuestion = () => {
    dispatch(helpOrderRedirect());
  };

  const handleGoToAnswer = item => {
    dispatch(helpOrderRedirect(item));
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    dispatch(helpOrderRequest(newPage));
  };

  const renderFooter = () => {
    return <Footer>{loading && <Loading />}</Footer>;
  };

  return (
    <Container>
      <ButtonContainer>
        <NewQuetionButton onPress={handleAddQuestion}>
          Novo pedido de auxílio
        </NewQuetionButton>
      </ButtonContainer>

      <List
        refreshing={loading}
        onEndReachedThreshold={0.1}
        initialNumToRender={7}
        onEndReached={() => {
          if (!loading && !lastPage) {
            handleLoadMore();
          }
        }}
        ListFooterComponent={renderFooter}
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

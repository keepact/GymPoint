import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { subscribe, unsubscribe } from 'pusher-redux/react-native';

import {
  Types,
  listHelpOrder,
  redirectHelpOrder,
} from '~/store/ducks/helporder';

import Loading from '~/components/Loading';
import Questions from './Questions';

import {
  Container,
  ButtonContainer,
  NewQuetionButton,
  List,
  ContainerLoading,
  LoadingWrapper,
  LoadingIndicator,
  EmptyContainer,
  NoData,
} from './styles';

function HelpOrderList() {
  const { helporders, page, lastPage, loading, loaded } = useSelector(
    state => state.helporder,
  );

  const dispatch = useDispatch();
  const currentHelpOrders = useMemo(() => helporders.length, [helporders]);

  useEffect(() => {
    if (currentHelpOrders === 0) {
      dispatch(listHelpOrder(page));
    }
  }, [dispatch, currentHelpOrders, page]);

  useEffect(() => {
    subscribe('answer', 'company-answer', Types.NEW_ASNWER);

    return () => {
      unsubscribe('answer', 'company-answer', Types.NEW_ASNWER);
    };
  });

  const handleAddQuestion = () => {
    dispatch(redirectHelpOrder());
  };

  const handleGoToAnswer = item => {
    dispatch(redirectHelpOrder(item));
  };

  const handleLoadMore = () => {
    if (!loading && !lastPage) {
      const newPage = page + 1;
      dispatch(listHelpOrder(newPage));
    }
  };

  const renderFooter = () => {
    return (
      <ContainerLoading>
        {!lastPage && (
          <LoadingWrapper>
            <LoadingIndicator />
          </LoadingWrapper>
        )}
      </ContainerLoading>
    );
  };

  return (
    <Container>
      <ButtonContainer>
        <NewQuetionButton onPress={handleAddQuestion}>
          Novo pedido de auxílio
        </NewQuetionButton>
      </ButtonContainer>

      {!loaded && (
        <ContainerLoading>
          <Loading />
        </ContainerLoading>
      )}
      {currentHelpOrders > 0 ? (
        <List
          refreshing={loading}
          onEndReachedThreshold={0.1}
          initialNumToRender={7}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          data={helporders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Questions data={item} onSubmit={() => handleGoToAnswer(item)} />
          )}
        />
      ) : (
        <EmptyContainer>
          <NoData>Não há Perguntas</NoData>
        </EmptyContainer>
      )}
    </Container>
  );
}

export default HelpOrderList;

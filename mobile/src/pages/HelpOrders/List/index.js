import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { helpOrderRequest, helpOrderRedirect } from '~/store/modules/helporder';

import Loading from '~/components/Loading';
import Questions from '~/components/Questions';

import {
  Container,
  ButtonContainer,
  NewQuetionButton,
  List,
  ContainerLoading,
  LoadingWrapper,
  LoadingIndicator,
} from './styles';

function HelpOrderList() {
  const { helporders, page, lastPage, loading, loaded } = useSelector(
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
    if (!loading && !lastPage) {
      const newPage = page + 1;
      dispatch(helpOrderRequest(newPage));
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

      {!loaded ? (
        <ContainerLoading>
          <Loading />
          <Loading />
          <Loading />
        </ContainerLoading>
      ) : (
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
      )}
    </Container>
  );
}

export default HelpOrderList;

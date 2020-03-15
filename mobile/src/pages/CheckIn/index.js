import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { listCheckIn, createCheckIn } from '~/store/ducks/checkin';

import Loading from '~/components/Loading';
import CheckIns from '~/components/CheckIns';

import {
  Container,
  CheckInButton,
  ButtonContainer,
  List,
  NoData,
  ContainerLoading,
  LoadingWrapper,
  LoadingIndicator,
  EmptyContainer,
} from './styles';

function CheckIn() {
  const { checkIns, page, lastPage, loading, loaded } = useSelector(
    state => state.checkin,
  );
  const dispatch = useDispatch();
  const currentCheckins = useMemo(() => checkIns.length, [checkIns]);

  const handleAddCheckIn = () => {
    dispatch(createCheckIn());
  };

  const handleLoadMore = () => {
    if (!loading && !lastPage) {
      const newPage = page + 1;
      dispatch(listCheckIn(newPage));
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
        <CheckInButton onPress={handleAddCheckIn}>Novo check-in</CheckInButton>
      </ButtonContainer>
      {!loaded && (
        <ContainerLoading>
          <Loading />
        </ContainerLoading>
      )}
      {currentCheckins > 0 ? (
        <List
          refreshing={loading}
          onEndReachedThreshold={0.1}
          initialNumToRender={7}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          data={checkIns}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CheckIns data={item} />}
        />
      ) : (
        <EmptyContainer>
          <NoData>Não há checkins</NoData>
        </EmptyContainer>
      )}
    </Container>
  );
}

const tabBarIcon = ({ tintColor }) => {
  return <Icon name="event" size={20} color={tintColor} />;
};

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default CheckIn;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { checkInRequest } from '~/store/modules/checkin';

import Loading from '~/components/Loading';
import CheckIns from '~/components/CheckIns';

import {
  Container,
  CheckInButton,
  ButtonContainer,
  List,
  Footer,
} from './styles';

function CheckIn() {
  const { checkIns, page, lastPage, loading } = useSelector(
    state => state.checkin,
  );
  const dispatch = useDispatch();

  const handleAddCheckIn = () => {
    dispatch(checkInRequest());
  };

  const handleLoadMore = () => {
    const newPage = page + 1;
    dispatch(checkInRequest(newPage, 'refresh'));
  };

  const renderFooter = () => {
    return <Footer>{loading && <Loading />}</Footer>;
  };

  return (
    <Container>
      <ButtonContainer>
        <CheckInButton onPress={handleAddCheckIn}>Novo check-in</CheckInButton>
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
        data={checkIns}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <CheckIns data={item} />}
      />
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

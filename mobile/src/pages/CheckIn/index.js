import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckIns from '~/components/CheckIns';

import { Container, CheckInButton, ButtonContainer, List } from './styles';
import { checkInRequest } from '~/store/modules/checkin';

function CheckIn() {
  const { studentId } = useSelector(state => state.auth);
  const { checkIns } = useSelector(state => state.checkin);
  const dispatch = useDispatch();

  const handleAddCheckIn = () => {
    dispatch(checkInRequest(studentId));
  };

  return (
    <Container>
      <ButtonContainer>
        <CheckInButton onPress={handleAddCheckIn}>Novo check-in</CheckInButton>
      </ButtonContainer>
      <List
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

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckIns from '~/components/CheckIns';
// import { Background } from '~/components/Background';

import { Container, CheckInButton, ButtonContainer, List } from './styles';

function CheckIn() {
  const { checkIns } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  function handleAddCheckIn() {}

  return (
    // <Background>
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
    // </Background>
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

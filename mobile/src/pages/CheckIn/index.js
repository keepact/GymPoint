import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

function CheckIn() {
  return <View />;
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

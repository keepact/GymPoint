import React from 'react';
import PropTypes from 'prop-types';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import CheckIn from './pages/CheckIn';

import HelpOrderList from './pages/HelpOrders/List';
import HelpOrderAsk from './pages/HelpOrders/Ask';
import HelpOrderAnswer from './pages/HelpOrders/Answer';

const tabBarIcon = ({ tintColor }) => (
  <Icon name="add-circle-outline" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            CheckIn,
            HelpOrders: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  HelpOrderAsk,
                  HelpOrderAnswer,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: 'transparent',
                  },
                },
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir Ajuda',
                tabBarIcon,
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999',
              style: {
                borderWidth: 1,
                borderColor: '#ddd',
                backgroundColor: '#fff',
              },
            },
          },
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'SignIn',
      },
    ),
  );

import React from 'react';
import PropTypes from 'prop-types';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import CheckIn from './pages/CheckIn';
import HelpOrderList from './pages/HelpOrders/List';
import HelpOrderAsk from './pages/HelpOrders/Ask';
import HelpOrderAnswer from './pages/HelpOrders/Answer';

import { navigationRef } from './services/navigation';

function Routes({ isSigned }) {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const tabBarIcon = (color, size, route) => {
    return route ? (
      <Icon name="add-circle-outline" size={size} color={color} />
    ) : (
      <Icon name="event" size={size} color={color} />
    );
  };

  const StackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          gestureEnabled: false,
          headerTransparent: true,
          headerTintColor: 'transparent',
        }}>
        <Stack.Screen
          name="Home"
          component={HelpOrderList}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="Ask" component={HelpOrderAsk} />
        <Stack.Screen name="Answer" component={HelpOrderAnswer} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {isSigned ? (
        <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#ee4e62',
            inactiveTintColor: '#999',
            style: {
              borderWidth: 1,
              borderColor: '#ddd',
              backgroundColor: '#fff',
            },
          }}>
          <Tab.Screen
            name="Checkins"
            component={CheckIn}
            options={{
              title: 'home',
              tabBarLabel: 'Checkins',
              tabBarIcon: ({ color, size }) => tabBarIcon(color, size, 'home'),
            }}
          />
          <Tab.Screen
            name="HelpOrders"
            component={StackNavigator}
            options={{
              title: 'Pedir Ajuda',
              tabBarLabel: 'Pedir Ajuda',
              tabBarIcon: ({ color, size }) => tabBarIcon(color, size),
            }}
          />
        </Tab.Navigator>
      ) : (
        <SignIn />
      )}
    </NavigationContainer>
  );
}

Routes.defaultProps = {
  isSigned: false,
};

Routes.propTypes = {
  isSigned: PropTypes.bool,
};

export default Routes;

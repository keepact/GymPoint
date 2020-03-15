import React from 'react';
import PropTypes from 'prop-types';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import CheckIn from './pages/CheckIn';
import { navigationRef } from './services/navigation';

import HelpOrderList from './pages/HelpOrders/List';
import HelpOrderAsk from './pages/HelpOrders/Ask';
import HelpOrderAnswer from './pages/HelpOrders/Answer';

function App({ isSigned }) {
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const tabBarIcon = ({ tintColor }) => (
    <Icon name="add-circle-outline" size={20} color={tintColor} />
  );

  tabBarIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
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
              title: 'Checkins',
              tabBarLabel: 'Checkins',
            }}
          />
          <Tab.Screen
            name="HelpOrders"
            component={StackNavigator}
            options={{
              title: 'Pedir Ajuda',
              tabBarLabel: 'Pedir Ajuda',
              tabBarIcon,
            }}
          />
        </Tab.Navigator>
      ) : (
        <SignIn />
      )}
    </NavigationContainer>
  );
}

App.defaultProps = {
  isSigned: false,
};

App.propTypes = {
  isSigned: PropTypes.bool,
};

export default App;

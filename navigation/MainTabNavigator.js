import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import { Platform } from 'react-native';
import AccountScreen from '../screens/AccountScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FiltersScreen from '../screens/FiltersScreen';
import OffersScreen from '../screens/OffersScreen';
import OpinionsScreen from '../screens/OpinionsScreen';
import React from 'react';
import TabBarIcon from '../components/TabBarIcon';

const OffersStack = createStackNavigator({
  Offers: OffersScreen,
});

OffersStack.navigationOptions = {
  tabBarLabel: 'Offers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'} />
  ),
};
const FiltersStack = createStackNavigator({
  Filters: FiltersScreen,
});
FiltersStack.navigationOptions = {
  tabBarLabel: 'Filters',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};
const DetailsStack = createStackNavigator({
  Details: DetailsScreen,
});

DetailsStack.navigationOptions = {
  tabBarLabel: 'Details',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'}
    />
  ),
};

const AccountStack = createStackNavigator({
  Account: AccountScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: 'Account',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
    />
  ),
};

const OpinionsStack = createStackNavigator({
  Opinions: OpinionsScreen,
});

OpinionsStack.navigationOptions = {
  tabBarLabel: 'Opinions',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-thumbs-up${focused ? '' : '-outline'}` : 'md-thumbs-up'}
    />
  ),
};

export default createBottomTabNavigator({
  OffersStack,
  FiltersStack,
  DetailsStack,
  OpinionsStack,
  AccountStack,
});

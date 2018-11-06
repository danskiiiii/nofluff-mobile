import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import AccountScreen from '../screens/AccountScreen';
import DetailsScreen from '../screens/DetailsScreen';
import FiltersScreen from '../screens/FiltersScreen';
import OffersScreen from '../screens/OffersScreen';
import OpinionsScreen from '../screens/OpinionsScreen';
import { Platform } from 'react-native';
import React from 'react';
import TabBarIcon from '../components/nav/TabBarIcon';
import TabBarLabel from '../components/nav/TabBarLabel';

const OffersStack = createStackNavigator({
  Offers: OffersScreen,
});

OffersStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabBarLabel title="Offers" focused={focused} />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'} />
  ),
};

const FiltersStack = createStackNavigator({
  Filters: FiltersScreen,
});
FiltersStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabBarLabel title="Filters" focused={focused} />,
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
  tabBarLabel: ({ focused }) => <TabBarLabel title="Details" focused={focused} />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}` : 'md-information-circle'}
    />
  ),
};

const OpinionsStack = createStackNavigator({
  Opinions: OpinionsScreen,
});

OpinionsStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabBarLabel title="Opinions" focused={focused} />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-thumbs-up${focused ? '' : '-outline'}` : 'md-thumbs-up'}
    />
  ),
};

const AccountStack = createStackNavigator({
  Account: AccountScreen,
});

AccountStack.navigationOptions = {
  tabBarLabel: ({ focused }) => <TabBarLabel title="Account" focused={focused} />,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person'}
    />
  ),
};

export default createBottomTabNavigator(
  {
    OffersStack,
    FiltersStack,
    DetailsStack,
    OpinionsStack,
    AccountStack,
  },
  {
    tabBarOptions: {
      style: { height: 42 },
    },
  }
);

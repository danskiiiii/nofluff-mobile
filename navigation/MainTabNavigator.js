import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';

import AccountScreen from '../screens/AccountScreen';
import Colors from '../config/Colors';
import DetailsScreen from '../screens/DetailsScreen';
import FiltersScreen from '../screens/FiltersScreen';
import OffersScreen from '../screens/OffersScreen';
import OpinionsScreen from '../screens/OpinionsScreen';
import { Platform } from 'react-native';
import React from 'react';
import TabBarIcon from '../components/nav/TabBarIcon';

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

export default createMaterialTopTabNavigator(
  {
    OffersStack,
    FiltersStack,
    DetailsStack,
    OpinionsStack,
    AccountStack,
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      backBehavior: 'initialRoute',
      activeTintColor: Colors.tabSelected,
      inactiveTintColor: Colors.tabDefaultLabel,
      style: {
        display: 'flex',
        height: 46,
        backgroundColor: '#fff',
      },
      labelStyle: {
        fontSize: 10,
        textAlign: 'center',
        marginTop: 2,
      },
      iconStyle: { marginTop: -6 },
      indicatorStyle: {
        backgroundColor: Colors.tabSelected,
      },
      upperCaseLabel: false,
    },
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);

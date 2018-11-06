import { StyleSheet, Text } from 'react-native';

import Colors from '../../constants/Colors';
import React from 'react';

const TabBarLabel = props => (
  <Text style={[styles.tabBarLabel, props.focused && styles.tabSelected]}>{props.title}</Text>
);

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 11,
    textAlign: 'center',
    color: '#9e9e9e',
  },
  tabSelected: {
    color: Colors.tabSelected,
  },
});

export default TabBarLabel;

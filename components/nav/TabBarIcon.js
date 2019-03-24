import Colors from '../../config/Colors';
import { Icon } from 'expo';
import React from 'react';

const TabBarIcon = props => (
  <Icon.Ionicons
    name={props.name}
    size={26}
    style={{ marginBottom: -3 }}
    color={props.focused ? Colors.tabSelected : Colors.tabDefault}
  />
);

export default TabBarIcon;

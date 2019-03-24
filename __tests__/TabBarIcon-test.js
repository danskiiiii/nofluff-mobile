import 'react-native';
import 'jsdom-global/register';

import { mount, shallow } from 'enzyme';

import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import React from 'react';
import TabBarIcon from '../components/nav/TabBarIcon';
import renderer from 'react-test-renderer';

describe('TabBarIcon snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the TabBarIcon', async () => {
    const tree = renderer.create(<TabBarIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

function getComponent(focused, name) {
  return <TabBarIcon focused={focused} name={name} />;
}

describe('TabBarIcon component', () => {
  it('renders', () => {
    const wrapper = shallow(getComponent(true, 'md-options'));

    expect(wrapper.exists()).toBe(true);
  });

  it('renders Icon', () => {
    const wrapper = mount(getComponent(true, 'md-options'));

    expect(wrapper.find('Icon').exists()).toBe(true);
  });
});

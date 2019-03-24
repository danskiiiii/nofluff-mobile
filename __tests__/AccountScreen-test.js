import 'react-native';
import 'jsdom-global/register';

import { mount, shallow } from 'enzyme';

import { AccountScreen } from '../screens/AccountScreen';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import React from 'react';
import renderer from 'react-test-renderer';

describe('AccountScreen snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the AccountScreen', async () => {
    const tree = renderer.create(<AccountScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

function getComponent(auth) {
  return <AccountScreen auth={auth} />;
}

describe('AccountScreen component', () => {
  it('renders', () => {
    const wrapper = shallow(getComponent());

    expect(wrapper.exists()).toBe(true);
  });

  it('renders Image', () => {
    const wrapper = mount(getComponent());

    expect(wrapper.find('Image').exists()).toBe(true);
  });

  it('renders LoginForm when user is not authenticated', () => {
    const wrapper = mount(getComponent({ isLoggedIn: false }));

    expect(wrapper.find('LoginForm')).toHaveLength(1);
  });

  it('renders AccountDetails when user is logged in', () => {
    const wrapper = mount(getComponent({ isLoggedIn: true }));

    expect(wrapper.find('AccountDetails').exists()).toBe(true);
  });

  it('renders spinner when awaiting login action result', () => {
    const wrapper = mount(getComponent({ isLoggedIn: false, isPendingLogin: true }));

    expect(wrapper.find('ActivityIndicator').exists()).toBe(true);
  });
});

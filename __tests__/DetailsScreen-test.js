import 'react-native';
import 'jsdom-global/register';

import { mount, shallow } from 'enzyme';

import { DetailsScreen } from '../screens/DetailsScreen';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import React from 'react';
import renderer from 'react-test-renderer';

const defaultNavData = {
  getParam: jest.fn(),
};
const opinionNavData = {
  getParam: param => (param === 'data' ? '' : 'opinion'),
};
const offerNavData = {
  getParam: param => (param === 'data' ? '' : 'offer'),
};

describe('DetailsScreen snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the DetailsScreen', async () => {
    const tree = renderer.create(<DetailsScreen navigation={defaultNavData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

function getComponent(navigation, isLoading) {
  return <DetailsScreen navigation={navigation} isLoading={isLoading} />;
}

describe('DetailsScreen component', () => {
  it('renders', () => {
    const wrapper = shallow(getComponent(defaultNavData));

    expect(wrapper.exists()).toBe(true);
  });

  it('renders Image', () => {
    const wrapper = mount(getComponent(defaultNavData));

    expect(wrapper.find('Image').exists()).toBe(true);
  });

  it('renders spinner when awaiting data', () => {
    const wrapper = mount(getComponent(defaultNavData, true));

    expect(wrapper.find('ActivityIndicator').exists()).toBe(true);
  });

  it('renders OpinionDetail', () => {
    const wrapper = shallow(getComponent(opinionNavData, false));

    expect(wrapper.find('withNavigation(Connect(OpinionDetail))').exists()).toBe(true);
  });

  it('renders OfferDetail', () => {
    const wrapper = shallow(getComponent(offerNavData, false));

    expect(wrapper.find('withNavigation(Connect(OfferDetail))').exists()).toBe(true);
  });
});

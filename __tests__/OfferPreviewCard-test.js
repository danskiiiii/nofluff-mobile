import 'react-native';
import 'jsdom-global/register';

import { mount, shallow } from 'enzyme';

import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import OfferPreviewCard from '../components/OfferPreviewCard';
import React from 'react';
import renderer from 'react-test-renderer';

describe('OfferPreviewCard snapshot', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    NavigationTestUtils.resetInternalState();
  });

  it('renders the OfferPreviewCard', async () => {
    const tree = renderer.create(<OfferPreviewCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

function getComponent(onPress) {
  return <OfferPreviewCard onPress={onPress} />;
}

describe('OfferPreviewCard component', () => {
  it('renders', () => {
    const wrapper = shallow(getComponent());

    expect(wrapper.exists()).toBe(true);
  });

  it('renders Image', () => {
    const wrapper = mount(getComponent());

    expect(wrapper.find('Image').exists()).toBe(true);
  });

  it('renders two text components', () => {
    const wrapper = shallow(getComponent());

    expect(wrapper.find('Text')).toHaveLength(2);
  });

  it('reacts to onPress event', () => {
    const onPress = jest.fn();
    const wrapper = shallow(getComponent(onPress));

    wrapper.find('TouchableOpacity').simulate('press');
    expect(onPress.mock.calls.length).toBe(1);
  });
});

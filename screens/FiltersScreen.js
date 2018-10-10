import { Picker, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import React from 'react';
import { getOffers } from '../actions/creators/offers';
import store from '../store';

class FiltersScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { location: '', experience: '' };
  }

  onFilterPress = () => {
    store
      .dispatch(getOffers(this.state.location, this.state.experience))
      .then(() => this.props.navigation.navigate('Offers'));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.borderContainer}>
          <TextInput
            placeholder="Location"
            style={styles.input}
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            placeholderTextColor="rgba(0,0,0,0.35)"
            value={this.state.email}
            onChangeText={location => this.setState({ location })}
          />
        </View>
        <View style={styles.borderContainer}>
          <Text style={styles.labelText}>Required experience</Text>
          <Picker selectedValue={this.state.experience} onValueChange={experience => this.setState({ experience })}>
            <Picker.Item label="Any" value="" />
            <Picker.Item label="Junior" value="junior" />
            <Picker.Item label="Regular" value="regular" />
            <Picker.Item label="Senior" value="senior" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onFilterPress}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginBottom: 10,
    padding: 10,
    color: '#000',
  },
  borderContainer: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#2980b6',
    marginBottom: 5,
  },
  labelText: {
    marginLeft: 7,
    marginRight: 7,
    marginTop: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
  },
});
export default FiltersScreen;

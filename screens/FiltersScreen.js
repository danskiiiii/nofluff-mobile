import { Image, Picker, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { filterOffers, getOffers, searchOffers } from '../actions/creators/offers';

import { Icon } from 'expo';
import React from 'react';
import store from '../store';

class FiltersScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { search: '', location: '', experience: '', minSalary: '' };
  }

  onSearchPress = () => {
    store.dispatch(searchOffers(this.state.search)).then(() => this.props.navigation.navigate('Offers'));
  };

  onFilterPress = () => {
    store.dispatch(filterOffers(this.state)).then(() => this.props.navigation.navigate('Offers'));
  };

  onClearPress = () => {
    this.setState({ search: '', location: '', experience: '', minSalary: '' });
    store.dispatch(getOffers());
  };

  render() {
    return (
      <View style={styles.container}>
        <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            underlineColorAndroid="transparent"
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            placeholderTextColor="rgba(0,0,0,0.35)"
            value={this.state.search}
            onChangeText={search => this.setState({ search })}
          />
          <TouchableOpacity style={styles.searchIcon} onPress={this.onSearchPress}>
            <Icon.Ionicons
              name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'}
              size={46}
              style={{ marginLeft: 16, marginTop: 4 }}
              color="#ffffff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.borderContainer}>
          <TextInput
            style={styles.input}
            placeholder="Location"
            underlineColorAndroid="transparent"
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="default"
            returnKeyType="next"
            placeholderTextColor="rgba(0,0,0,0.35)"
            value={this.state.location}
            onChangeText={location => this.setState({ location })}
          />
        </View>
        <View style={styles.borderContainer}>
          <Text style={styles.labelText}>Required experience</Text>
          <Picker selectedValue={this.state.experience} onValueChange={experience => this.setState({ experience })}>
            <Picker.Item label="Any" value="" />
            <Picker.Item label="Junior" value="jr" />
            <Picker.Item label="Regular" value="md" />
            <Picker.Item label="Senior" value="sr" />
          </Picker>
        </View>
        <View style={styles.borderContainer}>
          <Text style={styles.labelText}>Minimum salary</Text>
          <Picker selectedValue={this.state.minSalary} onValueChange={minSalary => this.setState({ minSalary })}>
            <Picker.Item label="Any" value="" />
            <Picker.Item label="3000" value="2999" />
            <Picker.Item label="5000" value="4999" />
            <Picker.Item label="7000" value="6999" />
            <Picker.Item label="10000" value="9999" />
            <Picker.Item label="15000" value="14999" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.filterButtonContainer} onPress={this.onFilterPress}>
          <Text style={styles.filterText}>FILTER</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onClearPress}>
          <Text style={styles.clearText}>Clear filters</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 80,
  },
  input: {
    padding: 10,
    width: '80%',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderRadius: 3,
    borderColor: '#0aa69a',
    marginBottom: 50,
  },
  searchIcon: {
    backgroundColor: '#0aa69a',
    width: '20%',
    justifyContent: 'center',
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
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  filterButtonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 12,
    marginTop: 4,
  },
  filterText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
  },
  clearText: {
    textAlign: 'center',
    backgroundColor: '#d8d8d8',
    marginTop: 10,
    paddingVertical: 5,
  },
});

export default FiltersScreen;

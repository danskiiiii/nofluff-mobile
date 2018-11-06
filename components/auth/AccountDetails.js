import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { LOG_OUT } from '../../actions';
import React from 'react';
import store from '../../store';

class AccountDetails extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { email } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.bigImageContainer}>
          <Image resizeMode="contain" style={styles.bigLogo} source={require('../../assets/images/logo.png')} />
        </View>
        <Text style={styles.welcomeText}>Hello {email}, so glad to see you here!</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            store.dispatch({ type: LOG_OUT });
            Alert.alert('Log out completed');
          }}>
          <Text style={styles.buttonText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bigImageContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigLogo: {
    width: 300,
    height: 100,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  welcomeText: { padding: 12, fontSize: 20 },
});

export default AccountDetails;

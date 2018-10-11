import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { validateEmail, validatePassword } from '../helpers';

import React from 'react';
import store from '../store';
import { userRegistration } from '../actions/creators/auth';

class RegisterFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', passwordRepeat: '' };
  }

  onRegisterPress = () => {
    const { email, password, passwordRepeat } = this.state;

    if (password !== passwordRepeat) {
      return Alert.alert('Passwords do not match');
    }
    if (!validateEmail(email)) {
      return Alert.alert('Please enter a valid e-mail');
    }
    if (!validatePassword(password)) {
      return Alert.alert('Please enter a valid password.');
    }
    store.dispatch(userRegistration(email, password, 'TEMP NAME WTF???'));
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <TextInput
          placeholder="Email"
          underlineColorAndroid="transparent"
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholderTextColor="rgba(0,0,0,0.35)"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />

        <TextInput
          placeholder="Password"
          underlineColorAndroid="transparent"
          style={styles.input}
          returnKeyType="next"
          ref={input => (this.passwordInput = input)}
          onSubmitEditing={() => this.passwordInputRepeat.focus()}
          placeholderTextColor="rgba(0,0,0,0.35)"
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

        <TextInput
          placeholder="Repeat password"
          underlineColorAndroid="transparent"
          style={styles.input}
          returnKeyType="go"
          ref={input => (this.passwordInputRepeat = input)}
          placeholderTextColor="rgba(0,0,0,0.35)"
          secureTextEntry
          value={this.state.passwordRepeat}
          onChangeText={passwordRepeat => this.setState({ passwordRepeat })}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={this.onRegisterPress}>
          <Text style={styles.buttonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(0,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#000',
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '400',
  },
});

export default RegisterFrom;

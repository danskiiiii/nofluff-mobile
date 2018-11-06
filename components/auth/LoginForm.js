import { Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { validateEmail, validatePassword } from '../../helpers';

import React from 'react';
import store from '../../store';
import { userLogin } from '../../actions/creators/auth';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: 'admin@admin.com', password: 'Temp1234' };
  }

  onLoginPress = () => {
    const { email, password } = this.state;

    if (!validateEmail(email)) {
      return Alert.alert('Please enter a valid e-mail');
    }
    if (!validatePassword(password)) {
      return Alert.alert('Please enter a valid password');
    }
    store.dispatch(userLogin(email, password));
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
          returnKeyType="go"
          ref={input => (this.passwordInput = input)}
          placeholderTextColor="rgba(0,0,0,0.35)"
          secureTextEntry
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={this.onLoginPress}>
          <Text style={styles.buttonText}>LOG IN</Text>
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
    backgroundColor: '#0aa69a80',
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

export default LoginForm;

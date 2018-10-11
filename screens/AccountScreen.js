import { ActivityIndicator, Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import LoginForm from '../components/LoginForm';
import React from 'react';
import RegisterForm from '../components/RegisterForm';
import { connect } from 'react-redux';

class AccountScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { register: false };
  }

  // onButtonPress = () => {
  //   this.props.dispatch(userLogin());
  // };

  render() {
    const { isLoggedIn, isPendingLogin, isPendingRegistration } = this.props.auth;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {!isLoggedIn && [
          <View key="bigLogo" style={styles.imageContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
          </View>,
          <TouchableOpacity
            key="switchButton"
            onPress={() => this.setState(prevState => ({ register: !prevState.register }))}>
            <Text style={styles.noAccountText}>{this.state.register ? 'Back to login.' : 'No account? Tap here.'}</Text>
          </TouchableOpacity>,
          <View key="switchForm">
            {!this.state.register && <LoginForm />}
            {this.state.register && <RegisterForm />}
            {(isPendingLogin || isPendingRegistration) && <ActivityIndicator />}
          </View>,
        ]}
        {isLoggedIn && (
          <View style={styles.imageContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
            <ActivityIndicator size="large" color="#2980b6" />
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    width: 300,
    height: 100,
  },
  noAccountText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '300',
    backgroundColor: '#d8d8d8',
    marginLeft: 20,
    marginRight: 20,
  },
});

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AccountScreen);

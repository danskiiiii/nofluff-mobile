import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
  render() {
    const { logged } = this.props;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
        </View>
        <TouchableOpacity onPress={() => this.setState({ register: !this.state.register })}>
          <Text style={styles.noAccountText}>{this.state.register ? 'Back to login.' : 'No account? Tap here.'}</Text>
        </TouchableOpacity>
        <View>
          {!logged && !this.state.register && <LoginForm />}
          {this.state.register && <RegisterForm />}
        </View>
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
    logged: state.auth.isLoggedIn,
  };
}

export default connect(mapStateToProps)(AccountScreen);

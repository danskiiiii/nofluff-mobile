import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CLEAR_ERRORS, REGISTRATION_CONFIRMED } from '../actions';

import AccountDetails from '../components/auth/AccountDetails';
import LoginForm from '../components/auth/LoginForm';
import React from 'react';
import RegisterForm from '../components/auth/RegisterForm';
import { connect } from 'react-redux';

class AccountScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { registering: false };
  }

  render() {
    const { dispatch } = this.props;
    const { error, email, isLoggedIn, isPendingLogin, isPendingRegistration, isAwaitingConfirmation } = this.props.auth;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {isLoggedIn && <AccountDetails email={email} />}

        {!isLoggedIn && [
          <View key="bigLogo" style={styles.imageContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
          </View>,
          <TouchableOpacity
            key="switchButton"
            onPress={() => this.setState(prevState => ({ registering: !prevState.registering }))}>
            <Text style={styles.noAccountText}>
              {this.state.registering ? 'Back to login.' : 'No account? Tap here.'}
            </Text>
          </TouchableOpacity>,
          <View key="switchForm">
            {!this.state.registering && <LoginForm />}

            {this.state.registering && <RegisterForm />}

            {(isPendingLogin || isPendingRegistration) && <ActivityIndicator />}

            {isAwaitingConfirmation &&
              Alert.alert(
                'Account created!',
                'Activation link was sent.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      dispatch({ type: REGISTRATION_CONFIRMED });
                      this.setState({ registering: false });
                    },
                  },
                ],
                { cancelable: false }
              )}
            {error &&
              Alert.alert('Something went wrong :(', error, [
                {
                  text: 'OK...',
                  onPress: () => {
                    dispatch({ type: CLEAR_ERRORS });
                  },
                },
              ])}
          </View>,
        ]}
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
    backgroundColor: '#d8d8d8',
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 6,
  },
});

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AccountScreen);

import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { CLEAR_ERRORS } from '../../actions';
import React from 'react';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { sendApplication } from '../../actions/creators/offers';
import { withNavigation } from 'react-navigation';

class OfferDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { applicationTitle: `${props.data.title} - ${props.email}`, applicationText: '' };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.email !== this.props.email) {
      this.setState({ applicationTitle: `${this.props.data.title} - ${this.props.email}` });
    }
    if (prevProps.data.title !== this.props.data.title) {
      this.setState({ applicationTitle: `${this.props.data.title} - ${this.props.email}`, applicationText: '' });
    }
  }

  renderTools = () => {
    const { tools } = this.props.data;
    return tools.map(element => (
      <View style={styles.tools} key={element.id}>
        <Text>{element.tool}</Text>
        <StarRating
          containerStyle={styles.stars}
          fullStarColor="#0aa69a"
          starSize={18}
          disabled
          maxStars={5}
          rating={element.experience}
        />
      </View>
    ));
  };

  render() {
    const { data, dispatch, error, isLoggedIn, postPending, postSuccessful, navigation } = this.props;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.logo} source={{ uri: data.company.logo }} />
        </View>
        <Text style={styles.textTitle}>
          {data.title} @ {data.company.company_name}
        </Text>
        <ScrollView maxHeight={80}>
          <Text style={styles.textBody}>{data.description}</Text>
        </ScrollView>
        <Text style={styles.textBody}>
          Salary: {data.salary_low}-{data.salary_high} {data.salary_high_currency}
        </Text>
        <Text style={styles.textBody}>
          Employment type: {data.employment_type === 'b2b' ? 'Contract' : 'Permanent'}
        </Text>
        <Text style={styles.textBody}>Required skills:</Text>
        <ScrollView horizontal>{this.renderTools()}</ScrollView>

        {isLoggedIn && (
          <View>
            <TextInput
              placeholder="Write something about yourself..."
              underlineColorAndroid="transparent"
              multiline
              numberOfLines={4}
              maxHeight={60}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="rgba(0,0,0,0.35)"
              value={this.state.applicationText}
              onChangeText={applicationText => this.setState({ applicationText })}
            />
            <TouchableOpacity
              disabled={this.state.applicationText.length === 0}
              style={styles.submitBtn}
              onPress={() => {
                Keyboard.dismiss();
                dispatch(sendApplication(data.id, this.state.applicationTitle, this.state.applicationText));
                this.setState({ applicationText: '' });
              }}>
              {!postPending && <Text style={styles.btnText}>APPLY</Text>}
              {postPending && <ActivityIndicator />}
            </TouchableOpacity>
          </View>
        )}

        {!isLoggedIn && (
          <TouchableOpacity onPress={() => navigation.navigate('Account')}>
            <Text style={styles.toLoginBtn}>Log in to apply</Text>
          </TouchableOpacity>
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

        {postSuccessful &&
          Alert.alert('Thanks for applying!', `Expect to hear from ${data.company.company_name} soon`, [
            {
              text: 'Yay!',
              onPress: () => {
                dispatch({ type: CLEAR_ERRORS });
              },
            },
          ])}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  stars: { justifyContent: 'flex-start' },
  tools: { padding: 10 },
  imageContainer: {
    alignItems: 'center',
    height: 60,
  },
  logo: {
    width: 150,
    height: 80,
  },
  textTitle: { marginVertical: 20, fontSize: 18, textAlign: 'center' },
  textBody: { marginHorizontal: 10, marginVertical: 5 },
  textCentered: { textAlign: 'center', marginTop: 15 },
  input: {
    color: '#000',
    paddingHorizontal: 13,
  },
  submitBtn: {
    backgroundColor: '#2980b6',
    paddingVertical: 12,
    alignSelf: 'stretch',
    marginHorizontal: 13,
  },
  toLoginBtn: {
    textAlign: 'center',
    backgroundColor: '#d8d8d8',
    paddingVertical: 6,
    marginHorizontal: 10,
    marginTop: 30,
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
  },
});

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.token && true,
    postPending: state.offers.postPending,
    postSuccessful: state.offers.postSuccessful,
    error: state.offers.error,
    email: state.auth.email,
  };
}

export default withNavigation(connect(mapStateToProps)(OfferDetail));

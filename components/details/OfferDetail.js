import {
  ActivityIndicator,
  Alert,
  Image,
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
    if (prevProps.data !== this.props.data) {
      this.setState({ applicationTitle: `${this.props.data.title} - ${this.props.email}` });
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
    const { data, dispatch, error, isLoggedIn, postPending, navigation } = this.props;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="position">
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.logo} source={{ uri: data.company.logo }} />
        </View>
        <Text style={styles.textTitle}>
          {data.title} @ {data.company.company_name}
        </Text>
        <Text style={styles.textBody}>{data.description}</Text>
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
              maxHeight={80}
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="rgba(0,0,0,0.35)"
              value={this.state.applicationText}
              onChangeText={applicationText => this.setState({ applicationText })}
            />
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={() => {
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
          Alert.alert(
            'Something went wrong :(',
            error === 'Request failed with status code 403'
              ? 'You have already posted a review for this company'
              : error,
            [
              {
                text: 'OK...',
                onPress: () => {
                  dispatch({ type: CLEAR_ERRORS });
                },
              },
            ]
          )}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
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
  },
  submitBtn: {
    backgroundColor: '#2980b6',
    paddingVertical: 12,
    width: 100,
    marginTop: 20,
    alignSelf: 'center',
  },
  toLoginBtn: {
    textAlign: 'center',
    backgroundColor: '#d8d8d8',
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 6,
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
    error: state.offers.error,
    email: state.auth.email,
  };
}

export default withNavigation(connect(mapStateToProps)(OfferDetail));

import {
  ActivityIndicator,
  Alert,
  Image,
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
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { postReview } from '../../actions/creators/ratings';

class OpinionDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rating: null, reviewText: '' };
  }

  renderReviews = () => {
    const { opinions } = this.props;
    return opinions.map(element => (
      <ScrollView style={styles.ratings} key={element.id}>
        <StarRating
          containerStyle={styles.stars}
          fullStarColor="#2980b6"
          starSize={14}
          disabled
          maxStars={5}
          rating={element.rating}
        />
        <Text style={styles.ratingText}>{element.review}</Text>
      </ScrollView>
    ));
  };

  render() {
    const { data, dispatch, error, isLoggedIn, postPending } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.logo} source={{ uri: data.logo }} />
          {data.rating && (
            <StarRating
              containerStyle={styles.stars}
              fullStarColor="#2980b6"
              starSize={26}
              disabled
              maxStars={5}
              rating={data.rating}
            />
          )}
        </View>
        <Text style={styles.textTitle}>
          {data.company_name} {data.location}
        </Text>
        <Text style={styles.textCentered}>{data.rating ? `Rating: ${data.rating.toFixed(2)}` : 'Not rated yet'}</Text>
        <TouchableOpacity style={styles.websiteBtn} onPress={() => WebBrowser.openBrowserAsync(data.site_url)}>
          <Text style={styles.btnText}>Visit website</Text>
        </TouchableOpacity>

        <ScrollView horizontal>{this.renderReviews()}</ScrollView>
        {isLoggedIn && (
          <View>
            <TextInput
              placeholder="Write a review..."
              underlineColorAndroid="transparent"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="rgba(0,0,0,0.35)"
              value={this.state.reviewText}
              onChangeText={reviewText => this.setState({ reviewText })}
            />
            <View style={styles.imageContainer}>
              <StarRating
                containerStyle={styles.stars}
                fullStarColor="#2980b6"
                starSize={30}
                maxStars={5}
                rating={this.state.rating}
                selectedStar={rating => this.setState({ rating })}
              />
              <TouchableOpacity
                style={styles.submitBtn}
                onPress={() => {
                  dispatch(postReview(data.id, this.state.reviewText, this.state.rating));
                  this.setState({ rating: null, reviewText: '' });
                }}>
                {!postPending && <Text style={styles.btnText}>Submit</Text>}
                {postPending && <ActivityIndicator />}
              </TouchableOpacity>
            </View>
          </View>
        )}
        {!isLoggedIn && <Text style={styles.textCentered}>Log in to submit a review</Text>}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
  },
  textCentered: { textAlign: 'center' },
  stars: { justifyContent: 'center', alignSelf: 'center' },
  ratings: {
    margin: 2,
    paddingTop: 6,
    width: 200,
    height: 200,
    borderWidth: 2,
    borderRadius: 1,
    borderColor: '#c1c1c1',
  },
  ratingText: { padding: 5, textAlign: 'center' },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: 60,
  },
  logo: {
    bottom: 0,
    width: 150,
    height: 80,
  },
  textTitle: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
  },
  input: {
    color: '#000',
  },
  submitBtn: {
    backgroundColor: '#2980b6',
    paddingVertical: 10,
    width: 100,
    alignSelf: 'flex-end',
    bottom: 10,
  },
  websiteBtn: {
    backgroundColor: '#0aa69a',
    paddingVertical: 6,
  },
});

function mapStateToProps(state) {
  return {
    opinions: state.ratings.opinions,
    isLoggedIn: state.auth.token && true,
    postPending: state.ratings.postPending,
    error: state.ratings.error,
  };
}

export default connect(mapStateToProps)(OpinionDetail);
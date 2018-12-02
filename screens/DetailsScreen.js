import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

import OfferDetail from '../components/details/OfferDetail';
import OpinionDetail from '../components/details/OpinionDetail';
import React from 'react';
import { connect } from 'react-redux';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { isLoading, navigation } = this.props;
    const data = navigation.getParam('data') && JSON.parse(navigation.getParam('data'));
    const type = navigation.getParam('type');
    return (
      <View style={styles.container}>
        {type && (
          <View style={styles.imageContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
          </View>
        )}

        {isLoading && (
          <View style={styles.bigImageContainer}>
            <ActivityIndicator style={styles.bigLogo} size="large" color="#2980b6" />
          </View>
        )}

        {!isLoading && type === 'offer' && <OfferDetail data={data} />}

        {!isLoading && type === 'opinion' && <OpinionDetail data={data} />}

        {!isLoading &&
          type === undefined && (
            <View style={styles.bigImageContainer}>
              <Image resizeMode="contain" style={styles.bigLogo} source={require('../assets/images/logo.png')} />
            </View>
          )}
      </View>
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
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#c1c1c1',
  },
  logo: {
    bottom: 0,
    width: 150,
    height: 80,
  },
  bigImageContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  bigLogo: {
    position: 'absolute',
    width: 300,
    height: 100,
  },
  spinner: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
});

function mapStateToProps(state) {
  return {
    isLoading: state.ratings.loading,
  };
}

export default connect(mapStateToProps)(DetailsScreen);

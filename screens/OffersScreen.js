import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';

import OfferPreviewCard from '../components/OfferPreviewCard';
import React from 'react';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { getOffers } from '../actions/creators/offers';

class OffersScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.dispatch(getOffers());
  }

  handleClickTest = () => {
    WebBrowser.openBrowserAsync(`https://www.google.com/search?q=${this.props.data[1].username}`);
    Alert.alert(JSON.stringify(this.props.data));
  };

  renderOffers = () => {
    const { navigate } = this.props.navigation;
    const { data } = this.props;
    return data.map(element => (
      <OfferPreviewCard
        key={element.id}
        text1={element.name}
        text2={element.username}
        onPress={() =>
          navigate('Details', {
            offerId: element.id,
            data: JSON.stringify(element),
          })
        }
      />
    ));
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <OfferPreviewCard onPress={this.handleClickTest} text="Co" />
          <OfferPreviewCard
            onPress={() =>
              navigate('Details', {
                itemId: 86,
                otherParam: 'anything you want here',
              })
            }
            text="to"
          />
          <OfferPreviewCard onPress={() => navigate('Opinions')} text="za" />
          <OfferPreviewCard onPress={() => navigate('Account')} text="apka" />
          {this.renderOffers()}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#c1c1c1',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 60,
    borderBottomWidth: 1,
    borderColor: '#c1c1c1',
  },
  logo: {
    bottom: 0,
    width: 150,
    height: 80,
  },

  scrollContainer: {
    flex: 1,
    position: 'relative',
    marginBottom: 6,
    backgroundColor: '#c1c1c1',
  },
});

function mapStateToProps(state) {
  return {
    data: state.offers.data,
  };
}

export default connect(mapStateToProps)(OffersScreen);

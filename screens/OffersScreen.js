import { Image, ScrollView, StyleSheet, View } from 'react-native';

import OfferPreviewCard from '../components/OfferPreviewCard';
import React from 'react';
import { connect } from 'react-redux';
import { getOffers } from '../actions/creators/offers';

class OffersScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.dispatch(getOffers());
  }

  renderOffers = () => {
    const { navigate } = this.props.navigation;
    const { data } = this.props;
    return data.map(element => (
      <OfferPreviewCard
        key={element.id}
        title={element.title}
        company={element.company.company_name}
        location={element.company.location}
        logoUri={element.company.logo}
        onPress={() => navigate('Details', { data: JSON.stringify(element), type: 'offer' })}
      />
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
        </View>
        <ScrollView style={styles.scrollContainer}>{this.renderOffers()}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 150,
    height: 80,
  },
  scrollContainer: {
    marginBottom: 6,
  },
});

function mapStateToProps(state) {
  return {
    data: state.offers.data,
  };
}

export default connect(mapStateToProps)(OffersScreen);

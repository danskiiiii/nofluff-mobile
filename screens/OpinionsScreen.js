import { Alert, Image, ScrollView, StyleSheet, View } from 'react-native';
import { getCompanies, getOpinions } from '../actions/creators/ratings';

import OpinionPreviewCard from '../components/OpinionPreviewCard';
import React from 'react';
// import { WebBrowser } from 'expo';
import { connect } from 'react-redux';

class OpinionsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.dispatch(getCompanies());
  }

  handleClickTest = () => {
    // WebBrowser.openBrowserAsync(`https://www.google.com/search?q=${this.props}`);
    Alert.alert(JSON.stringify(this.props.data));
  };

  renderCompanies = () => {
    const { navigate } = this.props.navigation;
    const { data, dispatch } = this.props;
    return data.map(element => (
      <OpinionPreviewCard
        key={element.id}
        company={element.company_name}
        location={element.location}
        logoUri={element.logo}
        rating={element.rating}
        onPress={() =>
          dispatch(getOpinions(element.id)).then(
            navigate('Details', { data: JSON.stringify(element), type: 'opinion' })
          )
        }
      />
    ));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
        </View>
        <ScrollView style={styles.scrollContainer}>{this.renderCompanies()}</ScrollView>
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
    data: state.ratings.data,
  };
}

export default connect(mapStateToProps)(OpinionsScreen);

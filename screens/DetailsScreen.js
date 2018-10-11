import { Image, StyleSheet, Text, View } from 'react-native';

import React from 'react';

class DetailsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigation } = this.props;
    const data = navigation.getParam('data') && JSON.parse(navigation.getParam('data'));

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../assets/images/logo.png')} />
        </View>
        {data ? (
          <View>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                style={styles.logo}
                source={{ uri: 'https://nofluffjobs.com/upload/listing/Egnyte_20141107_131448.jpeg' }}
              />
            </View>
            <Text style={styles.textTitle}>
              {data.title} @ {data.company} {data.description} Salary: {data.salary_low}-{data.salary_high}
            </Text>
          </View>
        ) : (
          <Text> TODO no offer selected</Text>
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
  },
  logo: {
    bottom: 0,
    width: 150,
    height: 80,
  },
  textTitle: { marginTop: 20, fontSize: 20 },
});
export default DetailsScreen;

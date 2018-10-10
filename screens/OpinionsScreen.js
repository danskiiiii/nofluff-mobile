import { StyleSheet, Text } from 'react-native';

import React from 'react';

class OpinionsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return <Text style={styles.container}>TODO ...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
});
export default OpinionsScreen;

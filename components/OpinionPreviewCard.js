import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

const OpinionPreviewCard = ({ onPress, company, location, logoUri, rating }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.imageContainer}>
      <Image resizeMode="contain" style={styles.logo} source={{ uri: logoUri }} />
    </View>
    <Text allowFontScaling minimumFontScale={0.5} numberOfLines={1} style={styles.textTitle}>
      {company}
    </Text>
    <View style={styles.bottomContainer}>
      <Text numberOfLines={1} style={styles.textLocation}>
        {location}
      </Text>
      <Text numberOfLines={1} style={styles.textLocation}>
        {rating ? `Rating: ${rating.toFixed(2)}` : 'Not rated yet'}
      </Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderLeftWidth: 6,
    borderColor: '#0aa69a',
    marginTop: 6,
    marginLeft: 6,
    marginRight: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
  },
  logo: {
    top: 5,
    width: 60,
    height: 35,
  },
  textTitle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    paddingTop: 5,
  },
  bottomContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  textLocation: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    marginLeft: 4,
    color: 'grey',
    fontSize: 12,
    fontWeight: '100',
    padding: 10,
  },
});

export default OpinionPreviewCard;

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

const OfferPreviewCard = ({ onPress, text1, text2 }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={{ uri: 'https://nofluffjobs.com/upload/listing/Egnyte_20141107_131448.jpeg' }}
        />
      </View>
      <Text allowFontScaling minimumFontScale={0.5} numberOfLines={1} style={styles.textTitle}>
        {text1} @ {text2}
      </Text>
      <Text numberOfLines={1} style={styles.textLocation}>
        {text1}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderLeftWidth: 6,
    borderColor: '#2980b6',
    marginTop: 6,
    marginLeft: 10,
    marginRight: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
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
  textLocation: {
    alignSelf: 'center',
    color: 'grey',
    fontSize: 12,
    fontWeight: '100',
    paddingBottom: 10,
  },
});

export default OfferPreviewCard;

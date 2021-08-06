import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Utils from '../utils';

const CategoryList = props => {
  const {style, onPress, image, title} = props;

  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <FastImage source={image} style={styles.imageWishlist} />
      <View style={{paddingHorizontal: 10, flex: 1}}>
        <Text numberOfLines={1} style={styles.paddingVertical5}>
          {title}
        </Text>

        <View style={styles.contentRate} />
      </View>
    </TouchableOpacity>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  contain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentRate: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  paddingVertical5: {
    paddingVertical: 5,
    fontSize: 17,
    fontWeight: '600',
  },
  imageWishlist: {
    width: Utils.scaleWithPixel(80),
    height: Utils.scaleWithPixel(80),
    borderRadius: 8,
  },
});

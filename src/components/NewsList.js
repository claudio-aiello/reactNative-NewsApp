import React from 'react';
import TimeAgo from '../components/Time';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import * as Utils from '../utils';

const NewsList = props => {
  const {style, onPress, image, title, subtitle, date} = props;

  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Image source={image} style={styles.image} />
      <View
        style={{
          paddingHorizontal: 10,
          flex: 1,
          paddingVertical: 5,
        }}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text numberOfLines={2} style={styles.marginVertical5}>
          {title}
        </Text>
        <TimeAgo time={date} />
        <View style={styles.contentRate} />
      </View>
    </TouchableOpacity>
  );
};

export default NewsList;

const styles = StyleSheet.create({
  contain: {
    flexDirection: 'row',
  },
  contentRate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: Utils.scaleWithPixel(110),
    height: Utils.scaleWithPixel(80),
    borderRadius: 8,
  },
  marginVertical5: {
    marginVertical: 5,
    fontSize: 17,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9B9B9B',
  },
});

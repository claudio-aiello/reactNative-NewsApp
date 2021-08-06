import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import * as Utils from '../utils';

const News43 = props => {
  const {title, image, style, onPress} = props;

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        borderRadius={8}>
        <View style={styles.viewBackground}>
          <View style={styles.viewItem}></View>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default News43;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    shadowColor: '#006',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  imageBackground: {
    height: ((Utils.getWidthDevice() - 40) * 3) / 4,
    width: '100%',
  },
  viewBackground: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: 10,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

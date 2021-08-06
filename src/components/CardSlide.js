import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  Platform,
  StyleSheet,
} from 'react-native';

const CardSlide = props => {
  let {date, title, image, style, onPress} = props;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: 'white',
          borderColor: '#c7c7cc',
        },
        style,
      ]}
      onPress={onPress}>
      <ImageBackground
        source={image}
        style={styles.imageBackground}
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
      />

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      <Text style={styles.description}>{date}</Text>
    </TouchableOpacity>
  );
};

export default CardSlide;

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 0,
    borderWidth: StyleSheet.hairlineWidth,
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: {height: 0, width: 0},
        shadowOpacity: 3,
        shadowRadius: 3,
      },
    }),
  },
  imageBackground: {
    // height: 335,
    height: 120,
    width: 200,
  },
  title: {
    width: '100%',
    padding: 5,
    fontSize: 17,
    fontWeight: '600',
  },
  description: {
    width: '100%',
    padding: 5,
    paddingTop: 0,
    fontSize: 10,
    fontWeight: '500',
    color: '#9B9B9B',
  },
});

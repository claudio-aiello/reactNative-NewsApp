import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function Button(props) {
  const {
    style,
    styleText,
    icon,
    outline,
    full,
    round,
    loading,
    children,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={StyleSheet.flatten([
        [styles.default, {backgroundColor: '#FF8A65'}],
        outline && [
          styles.outline,
          {
            backgroundColor: '#F5F5F5',
            borderColor: '#E5634D',
          },
        ],
        full && styles.full,
        round && styles.round,
        style,
      ])}
      activeOpacity={0.9}>
      {icon ? icon : null}
      <Text
        style={StyleSheet.flatten([
          styles.textDefault,
          outline && {color: '#E5634D'},
          styleText,
        ])}
        numberOfLines={1}>
        {children || 'Button'}
      </Text>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={outline ? '#E5634D' : 'white'}
          style={{paddingLeft: 5}}
        />
      ) : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    height: 50,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textDefault: {
    fontSize: 21,
    color: 'white',
    fontWeight: '600',
  },
  outline: {
    borderWidth: 1,
  },

  full: {
    width: '100%',
    alignSelf: 'auto',
  },
  round: {
    borderRadius: 28,
  },
});

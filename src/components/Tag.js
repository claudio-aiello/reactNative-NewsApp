import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function Tag(props) {
  const {
    style,
    textStyle,
    icon,
    primary,
    primaryIcon,
    outline,
    outlineIcon,
    outlineSecondary,
    outlineSecondaryIcon,
    small,
    light,
    gray,
    chip,
    status,
    rate,
    rateSmall,
    sale,
    children,
    ...rest
  } = props;

  return (
    <TouchableOpacity
      {...rest}
      style={StyleSheet.flatten([
        styles.default,
        primary && [styles.primary, {backgroundColor: '#E5634D'}],
        primaryIcon && styles.primary,
        outline && [
          styles.outline,
          {
            borderColor: '#E5634D',
            backgroundColor: '#F5F5F5',
          },
        ],
        outlineIcon && styles.outline,
        outlineSecondary && styles.outlineSecondary,
        outlineSecondaryIcon && [
          styles.outlineSecondary,
          {borderColor: '#4A90A4'},
        ],
        small && [styles.small, {backgroundColor: '#E5634D'}],
        light && [styles.light, {backgroundColor: '#E5634D'}],
        gray && styles.gray,
        chip && [
          styles.chip,
          {
            backgroundColor: '#F5F5F5',
            borderColor: '#4A90A4',
          },
        ],
        status && [styles.status, {backgroundColor: '#E5634D'}],
        rate && [styles.rate, {backgroundColor: '#FF8A65'}],
        rateSmall && [styles.rateSmall, {backgroundColor: '#FF8A65'}],
        sale && [styles.sale, {backgroundColor: '#FF8A65'}],
        style,
      ])}
      activeOpacity={0.9}>
      {icon ? icon : null}
      <Text
        style={StyleSheet.flatten([
          primary && styles.textPrimary,
          primaryIcon && styles.textPrimary,
          outline && [styles.textOutline, {color: '#E5634D'}],
          outlineIcon && [styles.textOutline, {color: '#E5634D'}],
          outlineSecondary && [styles.textOutlineSecondary, {color: '#4A90A4'}],
          outlineSecondaryIcon && [
            styles.textOutlineSecondary,
            {color: '#4A90A4'},
          ],
          small && styles.textSmall,
          light && [styles.textLight, {color: '#FF8A65'}],
          gray && styles.textGray,
          chip && [styles.textChip, {color: '#4A90A4'}],
          status && styles.textStatus,
          rate && styles.textRate,
          rateSmall && styles.textRateSmall,
          sale && styles.textSale,
          textStyle,
        ])}
        numberOfLines={1}>
        {children || 'Tag'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
  },
  primary: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineSecondary: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 17,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  small: {
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  light: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gray: {
    padding: 5,
    backgroundColor: '#F5F5F5',
    borderColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
  },
  status: {
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rate: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  rateSmall: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sale: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

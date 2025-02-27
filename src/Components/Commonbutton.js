import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, commonStyles, FONT_FAMILY} from '../Styles/utlis';
import PropTypes from 'prop-types';

export default function Commonbutton({
  text,
  color = 'white',
  fontSize = 17,
  fontWeight,
  borderRadius = 10,
  height = 50,
  width = '100%',
  onPress,
  backgroundColor="blue",
  borderWidth,
  borderColor,
 
  marginBottom,
  paddingHorizontal,
  borderTopLeftRadius,
  borderTopRightRadius,
  fontFamily= '500',
  disabled,
  textAlign
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        {
          height,
          width,
          backgroundColor,
          borderWidth,
          borderColor,
          borderRadius,
          marginBottom,
          paddingHorizontal,
          borderTopLeftRadius,
          borderTopRightRadius,
        },
      ]}
    >
      <Text style={[styles.text, {fontWeight, fontSize, color, fontFamily, textAlign}]}>{text}</Text>
       
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingLeft: 15,
    // paddingRight: 15,
  },
 
  text: {
    marginHorizontal: 5, // Add some space around the text
  },
});
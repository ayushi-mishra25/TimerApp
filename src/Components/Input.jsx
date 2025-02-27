import { StyleSheet, Text, View , TextInput} from 'react-native'
import React from 'react'


    export default function Input({placeholder, value,onChangeText,keyboardType,screenwidth="100%"}) {
  return (
    <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText} style={[styles.InputBox,{width:screenwidth}]} keyboardType={keyboardType} />
  )
}

const styles = StyleSheet.create({
  InputBox:{
    borderWidth:1,
    marginBottom:4,
    borderRadius:10,
    borderColor:'#ccc',
    paddingHorizontal:10
  }
})
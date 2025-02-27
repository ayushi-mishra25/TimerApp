import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Timerscreen from './src/screens/Timerscreen';
import Historyscreen from './src/screens/Historyscreen';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Timerscreen"
        component={Timerscreen}
        
      />
      <Stack.Screen name="Historyscreen" component={Historyscreen} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({})
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatScreen from './screens/ChatScreen'
import LoginScreen from './screens/LoginScreen'
import CreateScreen from './screens/CreateScreen'
const Stack = createStackNavigator(); 
export default function App() {
  return (
    <NavigationContainer mode="modal">
      <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title:"Login"}}/>
      <Stack.Screen name="ChatScreen" component={ChatScreen}/>
      <Stack.Screen name="CreateScreen" component={CreateScreen} options={{title:"Create an Account"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

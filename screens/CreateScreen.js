import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { useState } from 'react';
import firebase from "../database/firebaseDB";
import "firebase/auth";

export default function ChatScreen({navigation}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState({})
    //Function to sign up
    function signUp(email, password){
        firebase
          .auth()
          .createUserWithEmailAndPassword(email,password)
          .then((user) => {
            navigation.navigate("ChatScreen", {user})
          })
          .catch((error) => {
            console.log(error)
          });
    }
    return (
      <TouchableWithoutFeedback style={styles.feedback}>
        <View style={styles.container}>
          <View>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            <Text>Password</Text>
            <TextInput
              passwordRu
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                signUp(email, password);
              }}
            >
              <Text>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:"center",
      alignItems:"center",
      padding:10,
      backgroundColor: '#fff',
      width:"100%"
    },
    button:{
        marginTop:5,
        padding:5,
        borderColor:"black",
        borderWidth:2,
        backgroundColor:"orange",
    },
    input:{
        padding:5,
        borderWidth:2,
        borderColor:"black",
    }
  });
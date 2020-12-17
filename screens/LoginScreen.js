import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './ChatScreen'
import { useState } from 'react';
import firebase from "../database/firebaseDB";
import "firebase/auth";
import { useEffect } from 'react';

export default function LoginScreen({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity onPress={()=>navigation.navigate('CreateScreen')}>
                <Text>Sign up</Text>
              </TouchableOpacity>
            ),
          });
    })
    function signIn(){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user)=>{
            console.log(user)
            console.log("Tis correct")
            navigation.navigate("ChatScreen")
            
        }).catch(error=>console.log(error))
    }
    
    return(
    <TouchableWithoutFeedback style={styles.feedback}>
        <View style={styles.container}>
        <View>
        <Text>Email</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
        <Text>Password</Text>
        <TextInput passwordRu style={styles.input} placeholder="Password" 
        secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)}></TextInput>
        <TouchableOpacity style={styles.button} onPress={()=>{
            console.log(email)
            console.log(password)
            signIn(email,password)}}>
            <Text>Login</Text>
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
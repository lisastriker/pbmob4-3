import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatScreen from './ChatScreen'
import { useState } from 'react';
import firebase from "../database/firebaseDB";
import "firebase/auth";
import { useEffect } from 'react';
const auth = firebase.auth();

export default function LoginScreen({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorM, setErrorM] = useState("")
    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity onPress={()=>navigation.navigate('CreateScreen')}>
                <Text style={styles.signUp}>Sign up</Text>
              </TouchableOpacity>
            ),
          });
    })

    useEffect(()=>{
        const unsubscrite = auth.onAuthStateChanged((user)=>{
             if(user){
                 navigation.navigate("ChatScreen");
             }else{
                 navigation.navigate("LoginScreen");
             }
        })
     },[])


    function signIn(){
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((user)=>{            
            console.log(user)
            console.log("Tis correct")
            navigation.navigate("ChatScreen")
            
        }).catch(error=>setErrorM(error.message))
    }
    
    return(
    <TouchableWithoutFeedback style={styles.feedback}>
        <View style={styles.container}>
        <View>
        <Text style={styles.word}>Email</Text>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text)=>setEmail(text)}></TextInput>
        <Text style={styles.word}>Password</Text>
        <TextInput passwordRu style={styles.input} placeholder="Password" 
        secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)}></TextInput>
        <TouchableOpacity style={styles.button} onPress={()=>{
            console.log(email)
            console.log(password)
            signIn(email,password)}}>
            <Text>Login</Text>
        </TouchableOpacity>
        <Text style={styles.error}>{errorM}</Text>
        </View>
        </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent:"center",
      padding:20,
      backgroundColor: '#fff',
      width:"100%"
    },
    button:{
        marginTop:5,
        padding:5,
        borderColor:"black",
        borderWidth:2,
        backgroundColor:"orange",
        borderRadius:3,
    },
    input:{
        padding:5,
        borderWidth:2,
        borderColor:"black",
        marginBottom:5,
        borderRadius:3,
    },
    signUp:{
        marginRight:10,
    },
    error:{
        width:"100%",
    },
    word:{
        marginBottom:3,
    }
  });
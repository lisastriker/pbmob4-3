import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from "../database/firebaseDB";
import "firebase/auth";
import { useEffect } from 'react';

export default function ChatScreen(){

    useEffect(()=>{
        getUser()
    },[])
    function getUser(){
        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                console.log(user)
                console.log("hi")
            }
            else{
                console.log("no user")
            }
        })
    }
    return(
    <View>
        <Text></Text>
    </View>
    );
}
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from "../database/firebaseDB";
import "firebase/auth";
import { useEffect, useState, useCallback } from 'react';
import {GiftedChat} from 'react-native-gifted-chat'


const user = firebase.auth().currentUser;
const auth = firebase.auth();
export default function ChatScreen({navigation, route}){
    const [messages, setMessages] = useState([])


    useEffect(()=>{
        getUser()
        setMessages([
            {
              _id: 1,
              text: 'Hello developer',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ])
    },[])

    useEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity onPress={()=>logout()}>
                <Text style={styles.signOut}>Sign Out</Text>
              </TouchableOpacity>
            ),
          });
    })

    function sendMessages(newMessages){
        setMessages([...newMessages, ...messages ])
    }

    function logout(){
        auth.signOut();
    }

    function getUser(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                navigation.navigate("ChatScreen")
    
            }
            else{
                console.log("no user")
            }
        })
    }
    return(
    <GiftedChat
      messages={messages}
      onSend={newMessages => sendMessages(newMessages)}
      user={{
        _id: 1,
      }}
    />
    );
}

const styles = StyleSheet.create({
    signOut:{
        marginRight:10,
    }
})
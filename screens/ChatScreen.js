import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from "../database/firebaseDB";
import "firebase/auth";
import { useEffect, useState, useCallback } from 'react';
import {GiftedChat} from 'react-native-gifted-chat'

const db = firebase.firestore().collection("messages")
const user = firebase.auth().currentUser;
const auth = firebase.auth();
export default function ChatScreen({navigation, route}){
    const [messages, setMessages] = useState([])


    useEffect(()=>{
        getUser()
        //Load data from firebase

        const unsubscribeSnapshot = db
        .orderBy("createdAt", "desc")
        .onSnapshot(collectionSnapshot=>{
            const serverMessage = collectionSnapshot.docs.map((doc)=> {
            const returnData = {
                ...doc.data(),
                createdAt: new Date(doc.data().createdAt.seconds*1000)
            }
            return returnData
            });
            setMessages(serverMessage)
        })
        return ()=> {unsubscribeSnapshot()} //the unsubscribeSnapshot runs at mount, and stops when page closes
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
        const newMessage = newMessages[0]
        db.add(newMessage)
        //setMessages([...newMessages, ...messages ])
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
      renderUsernameOnMessage={true}
      user={{
        _id: 1,
      }}
      user={{_id:auth.currentUser.uid,
      name:auth.currentUser.email,
      avatar:"http://placekitten.com/200/300"}}
    />
    );
}

const styles = StyleSheet.create({
    signOut:{
        marginRight:10,
    }
})
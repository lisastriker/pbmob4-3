//import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { firebase } from "@firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCONfxChelnIbYwgjHJn1SGg1cqTHyNr1E",
    authDomain: "chat-bb7e5.firebaseapp.com",
    projectId: "chat-bb7e5",
    storageBucket: "chat-bb7e5.appspot.com",
    messagingSenderId: "477390597153",
    appId: "1:477390597153:web:a8ec35b06815bd195a4760"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;